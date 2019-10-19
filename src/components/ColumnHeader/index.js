import React, { Component } from 'react';
import { Icon, Menu, Dropdown } from 'antd';
import { connect } from 'dva';

class ColumnHeader extends Component {
  handleMenuItemClick = ({ key }) => {
    const { deletePhase, projectId } = this.props;
    switch (key) {
      case '1':
        break;
      case '2':
        deletePhase(projectId);
        break;
      default:
        break;
    }
  }

  render() {
    const { name, dragHandleProps } = this.props;
    const CardMenu = (
      <Menu onClick={this.handleMenuItemClick}>
        <Menu.Item key="1">Edit</Menu.Item>
        <Menu.Item key="2">Delete</Menu.Item>
      </Menu>
    );
    return (
      <div
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
        {...dragHandleProps}
      >
        <h3>{name}</h3>
        <Dropdown overlay={CardMenu} trigger={['click']} placement="bottomRight">
          <button type="button" style={{ all: 'unset', cursor: 'pointer' }}>
            <Icon type="setting" theme="filled" />
          </button>
        </Dropdown>
      </div>
    );
  }
}

const mapStateToProps = ({
  projects: { selectedProject: { id } }
}) => ({
  projectId: id
});

const mapDispatchToProps = dispatch => ({
  deletePhase: (id) => dispatch({
    type: 'phases/deletePhase',
    payload: id
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(ColumnHeader);
