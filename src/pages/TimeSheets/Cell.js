import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, TimePicker, Input, Popover, Icon } from 'antd';
import moment from 'moment';
import styles from './index.less';
import { timeHelper } from '../../helpers/timeHelper';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      description: props.workLog.description,
      amount: props.workLog.amount,
      id: props.workLog.id
    };
  }

  static getDerivedStateFromProps({ workLog }, prevState) {
    if (workLog.id !== prevState.id) {
      return {
        description: workLog.description,
        amount: workLog.amount,
        id: workLog.id
      };
    }

    return null;
  }

  handleClose = () => {
    const { workLog } = this.props;
    this.setState({
      visible: false,
      description: workLog.description,
      amount: workLog.amount,
    });
  };

  handleOnVisibleChange = visible => {
    this.setState({ visible });
    if (!visible) {
      this.handleClose();
    }
  };

  onChange = (time, timeString) => {
    this.setState({ amount: timeHelper.totalHours(timeString) });
  };

  handleChange = (e) => {
    this.setState({ description: e.target.value });
  };

  handleSave = () => {
    const { workLog, logWork, updateWorkLog } = this.props;
    const { amount, description, id } = this.state;
    if (id) {
       // dispatch update worklog action
      updateWorkLog({ ...workLog, amount: timeHelper.getTimeSpanFromHours(amount), description });
    } else {
      logWork({ ...workLog, amount: timeHelper.getTimeSpanFromHours(amount), description });
    }
    this.setState({ visible: false });
  };

  renderLogWorkPopup = () => {
    const { amount, description } = this.state;
    return (
      <div style={{ backgroundColor: 'white', padding: 10 }}>
        <TimePicker
          value={moment(timeHelper.getTimeSpanFromHours(amount), 'HH:mm:ss')}
          style={{ marginBottom: 10 }}
          onChange={this.onChange}
        />
        <div style={{ marginBottom: 10 }}>
          <Input.TextArea
            placeholder="Description"
            type="textarea"
            rows={4}
            onChange={this.handleChange}
            value={description}
          />
        </div>
        <Button type="primary" style={{ marginRight: 10 }} onClick={this.handleSave}>
          <Icon type="check" />
          Save and close
        </Button>
        <Button onClick={this.handleClose}>Cancel</Button>
      </div>
    );
  }

  render() {
    const { workLog, row } = this.props;
    if (row === 'total') {
      return (<h4>{workLog.amount}</h4>);
    }

    return (
      <Popover
        content={this.renderLogWorkPopup()}
        trigger={['click']}
        onVisibleChange={this.handleOnVisibleChange}
        placement="bottomLeft"
        visible={this.state.visible}
      >
        <Button size="small" className={styles.cell}>{workLog.amount}</Button>
      </Popover>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  logWork: (workLog) => dispatch({
    type: 'tasks/logWork',
    payload: workLog
  }),
  updateWorkLog: (workLog) => dispatch({
    type: 'tasks/updateWorkLog',
    payload: workLog
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
