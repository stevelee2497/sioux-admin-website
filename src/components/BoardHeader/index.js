import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Button, Menu, Dropdown, Avatar, Divider, Input } from 'antd';
import { MODAL_TYPE } from '../../utils/constants';
import { parseImage } from '../../utils/images';

class BoardHeader extends Component {
  constructor(props) {
    super(props);
    this.input = createRef();
    this.state = {
      adding: false
    };
  }

  handleMenuItemClick = ({ key }) => {
    const { project: { id }, deleteBoard, changeProjectModalState } = this.props;
    switch (key) {
      case '1':
        changeProjectModalState(MODAL_TYPE.EDIT);
        break;
      case '2':
        deleteBoard(id);
        break;
      default:
        break;
    }
  }

  handleOnBlur = () => {
    // wait for a moment to ensure that if user click the Create button, the click button is fired
    setTimeout(() => {
      this.changeButtonState(false);
    }, 200);
  }

  changeButtonState = (state) => {
    this.setState({ adding: state }, () => {
      if (state) {
        this.input.current.focus();
      }
    });
  }

  renderInvite = () => {
    const { adding } = this.state;
    if (!adding) {
      return (
        <Button
          style={{ marginLeft: 10 }}
          onClick={() => this.changeButtonState(true)}
        >
          Invite
        </Button>
      );
    }

    return (
      <div style={{ display: 'flex', marginLeft: 10 }}>
        <Input ref={this.input} onBlur={this.handleOnBlur} placeholder="Enter email ..." />
        <Button type="primary" style={{ marginLeft: 10 }}>Add</Button>
      </div>
    );
  }

  renderUsers = (users) => users.map(user => (
    <Avatar key={user.id} src={parseImage(user.avatarUrl)} />
  ));

  render() {
    const { project } = this.props;
    if (!project) {
      return null;
    }

    const BoardMenu = (
      <Menu onClick={this.handleMenuItemClick}>
        <Menu.Item key="1">Edit</Menu.Item>
        <Menu.Item key="2">Delete board</Menu.Item>
      </Menu>
    );

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingRight: 10,
          paddingLeft: 10,
          paddingTop: 5,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <h2 style={{ marginBottom: 0, marginRight: 10 }}>{project.name}</h2>
          <Divider type="vertical" style={{ height: 25 }} />
          {this.renderUsers(project.users)}
          {this.renderInvite()}
        </div>
        <Dropdown overlay={BoardMenu} trigger={['click']}>
          <Button icon="setting" size="default" shape="circle" />
        </Dropdown>
      </div>
    );
  }
}

const mapStateToProps = ({
  projects: { selectedProject }
}) => ({
  project: selectedProject
});

const mapDispatchToProps = dispatch => ({
  deleteBoard: (id) => dispatch({
    type: 'projects/deleteBoard',
    payload: id
  }),
  changeProjectModalState: (modalType) => dispatch({
    type: 'modals/changeProjectModalState',
    payload: modalType
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardHeader);
