import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag, Button, Dropdown, Menu } from 'antd';

class TaskLabels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  handleVisibleChange = flag => {
    this.setState({ visible: flag });
  }

  handleMenuClick = ({ key }) => {
    console.log(key);
  }

  render() {
    const { visible } = this.state;

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">1</Menu.Item>
      </Menu>
    );
    
    return (
      <>
        <span style={{ marginLeft: 30 }}>label:</span>
        <Tag color="#00bfa5" style={{ marginLeft: 10 }}>Backlog</Tag>
        <Dropdown overlay={menu} trigger={['click']} onVisibleChange={this.handleVisibleChange} visible={visible}>
          <Button size="small" shape="circle" icon="tag" />
        </Dropdown>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskLabels);
