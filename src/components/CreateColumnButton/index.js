import React, { Component, createRef } from 'react';
import { connect } from 'dva';
import { Button, Input, Spin } from 'antd';
import styles from './index.less';

class CreateColumnButton extends Component {
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

  renderInput = () => (
    <div className={styles.container}>
      <Input
        ref={this.input}
        placeholder="Column name"
        onChange={this.handleInputChange}
        onBlur={this.handleOnBlur}
        value={this.state.inputValue}
      />
      <Button
        type="primary"
        style={{ marginLeft: 10 }}
        onClick={this.handleCreateColumn}
      >
        Create
      </Button>
    </div>
  )

  renderCreateColumn = () => (
    <Button
      type="dashed"
      onClick={() => this.changeButtonState(true)}
      className={styles.container}
    >
      Create another column
    </Button>
  )

  render() {
    const { editting } = this.state;
    return (
      <Spin spinning={this.props.loading}>
        {editting ? this.renderInput() : this.renderCreateColumn()}
      </Spin>
    );
  }
}

const mapStateToProps = ({
  loading: { effects },
}) => ({
  loading: effects['phases/createPhase'] === true
});

const mapDispatchToProps = dispatch => ({
  createPhase: (name) => dispatch({
    type: 'phases/createPhase',
    payload: name
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateColumnButton);
