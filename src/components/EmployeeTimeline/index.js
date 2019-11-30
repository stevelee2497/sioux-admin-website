import React, { Component } from 'react';
import { connect } from 'dva';
import { Timeline, Input, Button } from 'antd';
import { PROFILE_MODAL_TYPE } from '../../utils/constants';

class EmployeeTimeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
       newEvent: ''
    };
  }

  onChange = ({ target: { value } }) => {
    this.setState({ newEvent: value });
  };

  handleCreateEvent = () => {
    this.props.addTimeLineEvent({ userId: this.props.selectedEmployee.id, event: this.state.newEvent });
    this.setState({ newEvent: '' });
  }

  render() {
    const { timeLineEvents, removeTimeLineEvents, profileModalType } = this.props;
    const edit = profileModalType !== PROFILE_MODAL_TYPE.VIEW;
    return (
      <Timeline style={{ marginTop: 10 }}>
        {edit && (
        <Timeline.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: 450 }}>
            <Input placeholder="Timeline Event" onChange={this.onChange} value={this.state.newEvent} />
            <Button type="primary" shape="circle" icon="plus" style={{ marginLeft: 10 }} onClick={this.handleCreateEvent} />
          </div>
        </Timeline.Item>
        )}
        {timeLineEvents && timeLineEvents.map(item => (
          <Timeline.Item>
            <span style={{ marginLeft: 10 }}>{item.event}</span>
            {edit && <Button type="link" style={{ height: 0 }} onClick={() => removeTimeLineEvents(item.id)}>Delete</Button>}
          </Timeline.Item>
        ))}
      </Timeline>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedEmployee: state.people.selectedEmployee,
  profileModalType: state.people.profileModalType
});

const mapDispatchToProps = dispatch => ({
  addTimeLineEvent: (event) => dispatch({
    type: 'people/addTimeLineEvent',
    payload: event
  }),
  removeTimeLineEvents: (id) => dispatch({
    type: 'people/removeTimeLineEvents',
    payload: id
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeTimeline);
