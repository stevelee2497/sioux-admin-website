import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag, Button, Dropdown, Menu, Icon } from 'antd';
import _ from 'lodash';

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

  handleMenuClick = ({ key: labelId }) => {
    const { task: { id: taskId, taskLabels }, addTaskLabel, removeTaskLabel } = this.props;
    const taskLabel = taskLabels.find(item => item.labelId === labelId);
    if (taskLabel) {
      // remove member from task
      removeTaskLabel(taskLabel.id);
    } else {
      // add member to task
      addTaskLabel({ labelId, taskId });
    }
  }

  renderLabels = () => {
    const { labels, task: { taskLabels } } = this.props;
    return taskLabels.map(item => {
      const label = labels[item.labelId];
      return (
        <Tag key={label.id} color={label.color} style={{ marginRight: 3 }}>{label.name}</Tag>
      );
    });
  }

  render() {
    const { visible } = this.state;
    const { labels, task: { taskLabels } } = this.props;

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        {labels && _.map(labels, label => (
          <Menu.Item key={label.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minWidth: 150 }}>
            <Tag color={label.color}>{label.name}</Tag>
            {taskLabels.some(item => item.labelId === label.id) ? <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{ marginLeft: 10 }} /> : null}
          </Menu.Item>
        ))}
      </Menu>
    );

    return (
      <>
        <span style={{ marginLeft: 30, marginRight: 5 }}>label:</span>
        {this.renderLabels()}
        <Dropdown overlay={menu} trigger={['click']} onVisibleChange={this.handleVisibleChange} visible={visible}>
          <Button size="small" shape="circle" icon="tag" />
        </Dropdown>
      </>
    );
  }
}

const mapStateToProps = ({
  labels
}) => ({
  labels
});

const mapDispatchToProps = dispatch => ({
  addTaskLabel: (taskLabel) => dispatch({
    type: 'tasks/addTaskLabel',
    payload: taskLabel
  }),
  removeTaskLabel: (id) => dispatch({
    type: 'tasks/removeTaskLabel',
    payload: id
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskLabels);
