import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Spin, AutoComplete, Button, Menu, Dropdown, Avatar } from 'antd';
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
      members: props.members.map(item => ({ value: item.id, text: item.fullName })),
      inputValue: ''
    };
  }

  handleSearching = searchText => {
    const { members } = this.props;
    this.setState({
      members: !searchText
        ? members.map(item => ({ value: item.id, text: item.fullName }))
        : members.filter(value => value.fullName.toUpperCase().includes(searchText.toUpperCase())).map(item => ({ value: item.id, text: item.fullName })),
    });
  };

  handleSelecting = (id) => {
    const { project, addUserToProject } = this.props;
    addUserToProject({ userId: id, boardId: project.id });
    this.setState({ inputValue: '' });
  }

  handleChanging = value => {
    this.setState({ inputValue: value });
  };

  handleMemberClick = (item, menuKey) => {
    switch (menuKey) {
      case USER_MENU_OPTION.VIEW_PROFILE:
        // TODO: view user profile with item.userId
        break;
      case USER_MENU_OPTION.REMOVE:
        // TODO: Remove user from board with item.id
        break;
      default:
        break;
    }
  }

  changeButtonState = (state) => {
    this.setState({ adding: state }, () => {
      if (state) {
        this.input.current.focus();
      }
    });
  }

  renderMenu = (item) => (
    <Menu onClick={({ key }) => this.handleMemberClick(item, key)}>
      <Menu.Item key={USER_MENU_OPTION.VIEW_PROFILE}>Profile</Menu.Item>
      <Menu.Item key={USER_MENU_OPTION.REMOVE}>Remove</Menu.Item>
    </Menu>
  );

  renderUsers = (users) => users.map(item => (
    <Dropdown key={item.id} overlay={() => this.renderMenu(item)}>
      <Avatar src={parseImage(item.avatarUrl)} style={{ marginRight: 2 }} />
    </Dropdown>
  ));

  renderDefaultInvite = () => (
    <Button onClick={() => this.changeButtonState(true)}>
      Invite
    </Button>
  )

  renderEdittingInvite = () => {
    const { loading } = this.props;
    const { inputValue, members } = this.state;
    return (
      <Spin spinning={loading}>
        <AutoComplete
          dataSource={members}
          style={{ width: 150 }}
          onSelect={this.handleSelecting}
          onSearch={this.handleSearching}
          onChange={this.handleChanging}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardMembers);
