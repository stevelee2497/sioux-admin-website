import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Input } from 'antd';

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

  handleOnBlur = () => {
    // wait for a moment to ensure that if user click the Create button, the click button is fired
    setTimeout(() => {
      this.changeButtonState(false);
    }, 100);
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

  renderEditting = () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
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
          placeholder="asdfasd"
          autosize
        />
      </Card>
      <div>
        <Button type="primary">Create</Button>
        <Button icon="close" type="link" size="large" style={{ color: 'gray' }} ghost />
      </div>
    </div>
    )

  render() {
    const { editting } = this.state;

    return (
      editting ? this.renderEditting() : this.renderDefault()
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => ({
  changeTaskModalState: (modalType) => dispatch({
    type: 'modals/changeTaskModalState',
    payload: modalType
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskButton);
