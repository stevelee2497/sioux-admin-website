import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Menu, Dropdown } from 'antd';

const BoardMenu = ({ onItemClick }) => (
  <Menu onClick={onItemClick}>
    <Menu.Item key="1">Edit board</Menu.Item>
    <Menu.Item key="2">Delete board</Menu.Item>
  </Menu>
);

class BoardHeader extends Component {
  handleMenuItemClick = ({ key }) => {
    console.log(key);
  }

  render() {
    const { project } = this.props;
    if (!project) {
      return null;
    }

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
        <Dropdown overlay={(<BoardMenu onItemClick={this.handleMenuItemClick} />)} trigger={['click']}>
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

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(BoardHeader);
