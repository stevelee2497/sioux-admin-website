import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Tag, Input, Button } from 'antd';

const LabelRow = ({ label, icon }) => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
    Color:
    <div style={{ width: 100, marginLeft: 20 }}>
      <Tag color={label.color} style={{ marginRight: 3, marginBottom: 3 }}>
        {label.color}
      </Tag>
    </div>
    Name:
    <Input value={label.name} style={{ width: 200, marginLeft: 20 }} />
    <Button
      icon={icon || 'close'}
      type={icon ? 'primary' : 'default'}
      shape="circle"
      style={{ marginLeft: 10 }}
    />
  </div>
);

class LabelModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#000000',
      name: ''
    };
  }

  renderLabels = () => {
    const { labels } = this.props;
    return _.map(labels, item => (<LabelRow key={item.id} label={item} />));
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
        <LabelRow label={this.state} icon="plus" />
      </Modal>
    );
  }
}


const mapStateToProps = ({
  labels,
  modals: { labelModalVisible }
}) => ({
  labels,
  visible: labelModalVisible
});

const mapDispatchToProps = dispatch => ({
  changeLabelModalState: (visible) => dispatch({
    type: 'modals/changeLabelModalState',
    payload: visible
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(LabelModal);
