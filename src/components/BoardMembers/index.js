import React, { Component, createRef } from 'react';
import { connect } from 'dva';
import { Spin, AutoComplete, Button, Menu, Dropdown, Avatar } from 'antd';
import _ from 'lodash';
import { parseImage } from '../../utils/images';

const USER_MENU_OPTION = {
  VIEW_PROFILE: 'VIEW USER PROFILE',
  REMOVE: 'REMOVE'
};

class BoardMembers extends Component {
  constructor(props) {
    super(props);
    this.input = createRef();

    this.state = {
      adding: false,
      inputValue: ''
    };
  }

  changeButtonState = (state) => {
    this.setState({
      adding: state
    }, () => {
      if (state) {
        this.input.current.focus();
      }
    });
  }

  handleSelecting = (id) => {
    const { project: { id: boardId }, addUserToProject } = this.props;
    addUserToProject({ userId: id, boardId });
    this.setState({ inputValue: '' });
  }

  handleChanging = value => {
    this.setState({ inputValue: value });
  };

  handleMemberClick = (item, menuKey) => {
    const { removeBoardMember, showProfile } = this.props;
    switch (menuKey) {
      case USER_MENU_OPTION.VIEW_PROFILE:
        showProfile(item.userId);
        break;
      case USER_MENU_OPTION.REMOVE:
        removeBoardMember(item);
        break;
      default:
        break;
    }
  }

  handleBluring = () => {
    setTimeout(() => {
      this.changeButtonState(false);
    }, 200);
  }

  renderMenu = (item) => (
    <Menu onClick={({ key }) => this.handleMemberClick(item, key)}>
      <Menu.Item key={USER_MENU_OPTION.VIEW_PROFILE}>Profile</Menu.Item>
      <Menu.Item key={USER_MENU_OPTION.REMOVE}>Remove</Menu.Item>
    </Menu>
  );

  renderUsers = (users) => _.map(users, item => (
    <Dropdown key={item.id} overlay={() => this.renderMenu(item)}>
      <Avatar src={parseImage(item.avatarUrl)} style={{ marginRight: 2 }}>
        {item.fullName.match(/\b\w/g).join('')}
      </Avatar>
    </Dropdown>
  ));

  renderDefaultInvite = () => (
    <Button onClick={() => this.changeButtonState(true)}>
      Invite
    </Button>
  )

  renderEdittingInvite = () => {
    const { loading, members, project: { users } } = this.props;
    const { inputValue } = this.state;
    const dataSource = _(members).filter(
      item => !users[item.id] && item.fullName.toUpperCase().includes(inputValue.toUpperCase())
    ).map(
      item => ({ value: item.id, text: item.fullName })
    ).value();

    return (
      <Spin spinning={loading}>
        <AutoComplete
          dataSource={dataSource}
          style={{ width: 150 }}
          onSelect={this.handleSelecting}
          onChange={this.handleChanging}
          onBlur={this.handleBluring}
          placeholder="Name ..."
          value={inputValue}
          ref={this.input}
        />
        <Button style={{ marginLeft: 10 }} onClick={() => this.changeButtonState(false)}>Cancel</Button>
      </Spin>
    );
  }

  render() {
    const { project } = this.props;
    const { adding } = this.state;

    if (!project) {
      return null;
    }

    return (
      <div style={{ display: 'flex' }}>
        {this.renderUsers(project.users)}
        {adding ? this.renderEdittingInvite() : this.renderDefaultInvite()}
      </div>
    );
  }
}

const mapStateToProps = ({
  projects: { selectedProject },
  people: { dataSource },
  loading: { global }
}) => ({
  project: selectedProject,
  members: dataSource,
  loading: global
});

const mapDispatchToProps = dispatch => ({
  addUserToProject: boardUser => dispatch({
    type: 'projects/addUserToProject',
    payload: boardUser
  }),
  removeBoardMember: member => dispatch({
    type: 'projects/removeBoardMember',
    payload: member
  }),
  showProfile: id => dispatch({
    type: 'people/showProfile',
    payload: id
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardMembers);
