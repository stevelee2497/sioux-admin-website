import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Input, Spin } from 'antd';

class CreateTaskButton extends Component {
  constructor(props) {
    super(props);
    this.input = createRef();
    this.state = {
      editting: false,
      inputValue: ''
    };
  }

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  changeButtonState = (state) => {
    this.setState({ editting: state }, () => {
      if (state) {
        this.input.current.focus();
      }
    });
  }

  handleCreateColumn = () => {
    this.props.createPhase(this.state.inputValue);
    this.setState({ inputValue: '' });
  }

  handleCreateTask = () => {
    const { reporterUserId, boardId, phase, createTask } = this.props;
    const { inputValue } = this.state;
    const payload = {
      task: {
        title: inputValue,
        reporterUserId,
        boardId,
        assignees: []
      },
      phase
    };
    createTask(payload);
  }

  handleOnBlur = () => {
    // wait for a moment to ensure that if user click the Create button, the click button is fired
    setTimeout(() => {
      this.changeButtonState(false);
    }, 200);
  }

  renderDefault = () => (
    <div style={{ alignSelf: 'center' }}>
      <Button
        icon="plus"
        shape="circle"
        size="large"
        onClick={() => this.changeButtonState(true)}
      />
    </div>
  );

  renderEditting = () => {
    const { loading } = this.props;
    return (
      <Spin spinning={loading}>
        <Card
          style={{ marginBottom: 5 }}
          hoverable
          size="small"
          onClick={() => this.changeButtonState(true)}
        >
          <Input.TextArea
            ref={this.input}
            onBlur={this.handleOnBlur}
            style={{ borderColor: 'white', color: 'black', boxShadow: 'none', padding: 0 }}
            placeholder="Enter title for this card ..."
            autosize
            onChange={this.handleInputChange}
          />
        </Card>
        <div>
          <Button type="primary" onClick={this.handleCreateTask}>Create</Button>
          <Button icon="close" type="link" size="large" style={{ color: 'gray' }} ghost />
        </div>
      </Spin>
    );
  }

  render() {
    const { editting } = this.state;

    return (
      editting ? this.renderEditting() : this.renderDefault()
    );
  }
}

const mapStateToProps = ({
  passport: { profile: { id: reporterUserId } },
  projects: { selectedProject: { id: boardId } },
  loading: { global }
}) => ({
  reporterUserId,
  boardId,
  loading: global
});

const mapDispatchToProps = dispatch => ({
  createTask: (payload) => dispatch({
    type: 'tasks/createTask',
    payload
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskButton);
