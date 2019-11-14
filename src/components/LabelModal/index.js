import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import LabelRow from './LabelRow';

class LabelModal extends Component {
  renderLabels = () => {
    const { labels, selectedProject } = this.props;
    return _.map(labels, item => (<LabelRow key={item.id} labelId={item.id} color={item.color} name={item.name} boardId={selectedProject && selectedProject.id} />));
  }

  render() {
    const { visible, changeLabelModalState, selectedProject } = this.props;

    return (
      <Modal
        title="Labels"
        visible={visible}
        bodyStyle={{ display: 'flex', flexDirection: 'column' }}
        onOk={() => changeLabelModalState(false)}
        onCancel={() => changeLabelModalState(false)}
      >
        {this.renderLabels()}
        <LabelRow icon="plus" boardId={selectedProject && selectedProject.id} color="#000000" name="" />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(LabelModal);
