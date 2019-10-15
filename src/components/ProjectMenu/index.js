import React, { Component } from 'react';
import { Menu, Layout, Button, Avatar } from 'antd';
import { connect } from 'dva';
import { MODAL_TYPE } from '../../utils/constants';

class ProjectMenu extends Component {
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
        onClick={() => this.props.changeProjectModalState(MODAL_TYPE.CREATE)}
      >
        {!this.state.collapsed && 'New project'}
      </Button>
    </Menu.Item>
  )

  renderMenuItems = () => this.props.projects.map(item => (
    <Menu.Item key={item.id} style={{ marginTop: 0, padding: '0px!important', alignSelf: 'center' }}>
      <Avatar style={{ marginRight: this.state.collapsed ? 0 : 10, marginBottom: 3 }}>{item.name.match(/\b\w/g).join('')}</Avatar>
      {!this.state.collapsed && item.name}
    </Menu.Item>
  ));

  render() {
    const { projects } = this.props;
    const defaultSelectedKeys = projects[0] ? [projects[0].id] : [];
    return (
      <Layout.Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        theme="light"
        style={{ display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: '#ECECEC', overflow: 'hidden' }}
      >
        <Menu
          defaultSelectedKeys={defaultSelectedKeys}
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

const mapStateToProps = ({ projects }) => ({
  projects
});

const mapDispatchToProps = dispatch => ({
  changeProjectModalState: (modalType) => dispatch({
    type: 'modals/changeProjectModalState',
    payload: modalType
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMenu);
