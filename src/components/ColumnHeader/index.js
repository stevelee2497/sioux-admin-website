import React, { Component } from 'react';
import { Icon, Menu, Dropdown } from 'antd';
import { connect } from 'dva';
import ColName from '../ColName';

class ColumnHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editting: false,
      name: props.column.name
    };
  }

  handleSubmitNameUpdate = () => {
    const { column, updatePhase } = this.props;
    const { name } = this.state;
    updatePhase({ ...column, name });
    this.setState({ editting: false });
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  }

  handleOnBlur = () => {
    // wait for a moment to ensure that if user click the Create button, the click button is fired
    setTimeout(() => {
      this.setState({ editting: false });
    }, 100);
  }

  handleMenuItemClick = ({ key }) => {
    const { deletePhase, column: { id } } = this.props;
    switch (key) {
      case '1':
        this.setState({ editting: true });
        break;
      case '2':
        deletePhase(id);
        break;
      default:
        break;
    }
  }

  render() {
    const { dragHandleProps } = this.props;
    const { name, editting } = this.state;

    const CardMenu = (
      <Menu onClick={this.handleMenuItemClick}>
        <Menu.Item key="1">Edit</Menu.Item>
        <Menu.Item key="2">Delete</Menu.Item>
      </Menu>
    );

    return (
      <div
        style={{
          paddingTop: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
        {...dragHandleProps}
      >
        <ColName
          editting={editting}
          name={name}
          onChange={this.handleNameChange}
          onSubmit={this.handleSubmitNameUpdate}
          onBlur={this.handleOnBlur}
        />
        <Dropdown overlay={CardMenu} trigger={['click']} placement="bottomRight">
          <button type="button" style={{ all: 'unset', cursor: 'pointer' }}>
            <Icon type="setting" theme="filled" />
          </button>
        </Dropdown>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  deletePhase: (id) => dispatch({
    type: 'phases/deletePhase',
    payload: id
  }),
  updatePhase: (phase) => dispatch({
    type: 'phases/updatePhase',
    payload: phase
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ColumnHeader);
