import React, { Component } from 'react';
import { Menu, Layout, Button, Avatar } from 'antd';
import { connect } from 'dva';
import _ from 'lodash';
import { MODAL_TYPE } from '../../utils/constants';
import { parseImage } from '../../utils/images';

class ProjectMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  onCollapse = collapsed => {
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

  renderMenuItems = () => {
    const { projects } = this.props;
    return _.map(projects, item => (
      <Menu.Item key={item.id} style={{ marginTop: 0, padding: '0px!important', alignSelf: 'center' }}>
        <Avatar src={parseImage(item.imageUrl)} style={{ marginRight: this.state.collapsed ? 0 : 10, marginBottom: 3 }}>{item.name.match(/\b\w/g).join('')}</Avatar>
        {!this.state.collapsed && item.name}
      </Menu.Item>
    ));
  }

  handleOnSelectMenuItem = ({ key }) => {
    console.log(key);
    this.props.fetchProject(key);
  }

  render() {
    const { selectedProject } = this.props;

    return (
      <Layout.Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        theme="light"
        style={{ display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: '#ECECEC', overflow: 'hidden' }}
      >
        <Menu
          mode="inline"
          style={{ height: '100%', backgroundColor: '#ECECEC', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
          selectedKeys={[selectedProject && selectedProject.id]}
          onSelect={this.handleOnSelectMenuItem}
        >
          {this.renderCreateProjectButton()}
          {this.renderMenuItems()}
        </Menu>
      </Layout.Sider>
    );
  }
}

const mapStateToProps = ({
  projects: { involvedProjects, selectedProject }
}) => ({
  projects: involvedProjects,
  selectedProject
});

const mapDispatchToProps = dispatch => ({
  changeProjectModalState: (modalType) => dispatch({
    type: 'modals/changeProjectModalState',
    payload: modalType
  }),
  fetchProject: (id) => dispatch({
    type: 'projects/fetchProject',
    payload: id
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectMenu);
