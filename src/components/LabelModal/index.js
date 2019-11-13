import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import LabelRow from './LabelRow';

class LabelModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#000000',
      name: ''
    };
  }

  handleOnBlur = (e) => {
    const { name: id, value: name } = e.target;
    if (id) {
      // Update current labels
      const { labels, updateLabel } = this.props;
      const label = labels[id];
      if (label.name !== name) {
        updateLabel({ ...label, name });
      }
    } else {
      // Update new label state
      this.setState({ name });
    }
  }

  onButtonClicked = (e) => {
    const { name: buttonId } = e.target;
    const { deleteLabel, createLabel, selectedProject: { id: boardId } } = this.props;
    if (buttonId) {
      // handle remove label button clicked
      deleteLabel(buttonId);
    } else if (this.state.name) {
      // handle add label button clicked
      createLabel({ ...this.state, boardId });
      this.setState({
        color: '#000000',
        name: ''
      });
    }
  }

  renderLabels = () => {
    const { labels } = this.props;
    return _.map(labels, item => (
      <LabelRow
        key={item.id}
        label={item}
        onBlur={this.handleOnBlur}
        onButtonClicked={this.onButtonClicked}
      />
    ));
  }

  render() {
    const { visible, changeLabelModalState } = this.props;

    return (
      <Modal
        title="Labels"
        visible={visible}
        bodyStyle={{ display: 'flex', flexDirection: 'column' }}
        onOk={() => changeLabelModalState(false)}
        onCancel={() => changeLabelModalState(false)}
      >
        {this.renderLabels()}
        <LabelRow
          label={this.state}
          icon="plus"
          onBlur={this.handleOnBlur}
          onButtonClicked={this.onButtonClicked}
        />
      </Modal>
    );
  }
}


const mapStateToProps = ({
  labels,
  modals: { labelModalVisible },
  projects: { selectedProject }
}) => ({
  labels,
  visible: labelModalVisible,
  selectedProject
});

const mapDispatchToProps = dispatch => ({
  changeLabelModalState: (visible) => dispatch({
    type: 'modals/changeLabelModalState',
    payload: visible
  }),
  updateLabel: (label) => dispatch({
    type: 'labels/updateLabel',
    payload: label
  }),
  createLabel: (label) => dispatch({
    type: 'labels/createLabel',
    payload: label
  }),
  deleteLabel: (id) => dispatch({
    type: 'labels/deleteLabel',
    payload: id
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(LabelModal);
