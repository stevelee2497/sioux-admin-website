import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Menu, Dropdown } from 'antd';
import { MODAL_TYPE } from '../../utils/constants';


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
          paddingTop: 5
        }}
      >
        <h2 style={{ marginTop: -5, marginBottom: 0 }}>{project.name}</h2>
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
