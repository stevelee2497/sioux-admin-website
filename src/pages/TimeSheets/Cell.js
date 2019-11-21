import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, TimePicker, Input, Popover, Icon } from 'antd';
import moment from 'moment';
import styles from './index.less';

class Cell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: '',
      description: '',
      visible: false,
    };
  }

  handleClose = () => {
    this.setState({
      visible: false,
    });
  };

  handleOnVisibleChange = visible => {
    this.setState({ visible });
  };

  onChange = (time, timeString) => {
    this.setState({ amount: timeString });
  };

  handleChange = (e) => {
    this.setState({ description: e.target.value });
  };

  handleSave = () => {
    // dispatch update worklog action
    const { workLog, row } = this.props;
    const { amount, description } = this.state;
    console.log({
      ...workLog,
      amount,
      description
    },
    row);
    this.handleClose();
  };

  renderLogWorkPopup = () => (
    <div style={{ backgroundColor: 'white', padding: 10 }}>
      <TimePicker
        defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
        style={{ marginBottom: 10 }}
        onChange={this.onChange}
      />
      <div style={{ marginBottom: 10 }}>
        <Input.TextArea
          placeholder="Description"
          type="textarea"
          rows={4}
          onChange={this.handleChange}
        />
      </div>
      <Button type="primary" style={{ marginRight: 10 }} onClick={this.handleSave}>
        <Icon type="check" />
        Save and close
      </Button>
      <Button onClick={this.handleClose}>Cancel</Button>
    </div>
  )

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

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
