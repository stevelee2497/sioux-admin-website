import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Menu, Dropdown, Divider } from 'antd';
import { MODAL_TYPE } from '../../utils/constants';
import BoardMembers from '../BoardMembers';

class BoardHeader extends Component {
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

  render() {
    const { project, changeLabelModalState } = this.props;
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
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 5,
      }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center'
        }}
        >
          <h2 style={{ marginBottom: 0, marginRight: 10 }}>{project.name}</h2>
          <Divider type="vertical" style={{ height: 25 }} />
          <BoardMembers />
        </div>
        <div>
          <Button icon="tags" size="default" shape="circle" style={{ marginRight: 5 }} onClick={() => changeLabelModalState(true)} />
          <Dropdown overlay={BoardMenu} trigger={['click']}>
            <Button icon="setting" size="default" shape="circle" />
          </Dropdown>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  projects: { selectedProject },
}) => ({
  project: selectedProject,
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
  changeLabelModalState: (visible) => dispatch({
    type: 'modals/changeLabelModalState',
    payload: visible
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardHeader);
