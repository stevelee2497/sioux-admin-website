import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Icon, Layout, Button, Avatar } from 'antd';
import faker from 'faker';

const projects = [
  {
    id: faker.random.uuid(),
    name: faker.random.word(),
  },
  {
    id: faker.random.uuid(),
    name: faker.random.word(),
  },
];

export class ProjectMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
    };
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  renderCreateProjectButton = () => (
    <Menu.Item disabled style={{ padding: '0px!important', alignSelf: 'center' }}>
      <Button
        icon="plus"
        type={this.state.collapsed ? 'link' : 'dashed'}
      >
        {!this.state.collapsed && 'New project'}
      </Button>
    </Menu.Item>
  )

  renderMenuItems = () => projects.map(item => (
    <Menu.Item key={item.id} style={{ marginTop: 0, padding: '0px!important', alignSelf: 'center' }}>
      <Avatar style={{ marginRight: this.state.collapsed ? 0 : 10, marginBottom: 3 }}>{item.name.match(/\b\w/g).join('')}</Avatar>
      {!this.state.collapsed && item.name}
    </Menu.Item>
  ));

  render() {
    return (
      <Layout.Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        theme="light"
        style={{ display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: '#ECECEC' }}
      >
        <Menu
          defaultSelectedKeys={[projects[0].id]}
          mode="inline"
          style={{ height: '100%', backgroundColor: '#ECECEC', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
        >
          {this.renderCreateProjectButton()}
          {this.renderMenuItems()}
        </Menu>
      </Layout.Sider>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMenu);
