import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Spin, AutoComplete, Button, Menu, Dropdown, Avatar } from 'antd';
import { parseImage } from '../../utils/images';

const USER_MENU_OPTION = {
  VIEW_PROFILE: 'VIEW USER PROFILE',
  REMOVE: 'REMOVE'
};

const filterDefaultMembers = (all, current) =>
  all.filter(item => !current.some(user => user.userId === item.id))
    .map(item => ({ value: item.id, text: item.fullName }));

class BoardMembers extends Component {
  constructor(props) {
    super(props);
    this.input = createRef();
    const { members, project: { users } } = props;
    this.state = {
      adding: false,
      members: filterDefaultMembers(members, users),
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

  resetSearch = () => {
    const { members, project: { users } } = this.props;
    this.setState({
      inputValue: '',
      members: filterDefaultMembers(members, users)
    });
  }

  handleSearching = searchText => {
    const { members, project: { users } } = this.props;
    this.setState({
      members: !searchText
        ? filterDefaultMembers(members, users)
        : filterDefaultMembers(members, users).filter(member => member.text.toUpperCase().includes(searchText.toUpperCase())),
    });
  };

  handleSelecting = (id) => {
    const { project: { id: boardId }, addUserToProject } = this.props;
    addUserToProject({ userId: id, boardId });
    this.resetSearch();
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
        removeBoardMember(item.id);
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
  removeBoardMember: id => dispatch({
    type: 'projects/removeBoardMember',
    payload: id
  }),
  showProfile: id => dispatch({
    type: 'people/showProfile',
    payload: id
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardMembers);
