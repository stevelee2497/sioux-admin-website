import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AutoComplete, Button } from 'antd';

class SkillSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      dataSource: props.skills.map(item => ({ value: item.id, text: item.name })),
    };
  }

  onSearch = searchText => {
    const { skills } = this.props;
    this.setState({
      dataSource: !searchText ? skills.map(item => ({ value: item.id, text: item.name })) : skills.filter(value => value.name.toUpperCase().includes(searchText.toUpperCase())).map(item => ({ value: item.id, text: item.name })),
    });
  };

  onChange = value => {
    this.setState({ value });
  };

  onClick = () => {
    const { userId, addUserSkill, skills } = this.props;
    const { value } = this.state;
    if (skills.some(item => item.id === value)) {
      addUserSkill({ userId, skillId: value });
    } else {
      addUserSkill({ userId, newSkillName: value });
    }
    this.setState({ value: '' });
  }

  render() {
    const { dataSource, value } = this.state;

    return (
      <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between' }}>
        <AutoComplete
          dataSource={dataSource}
          style={{ width: 150 }}
          onSelect={this.onSelect}
          onSearch={this.onSearch}
          onChange={this.onChange}
          placeholder="Skill"
          value={value}
        />
        <Button type="primary" shape="circle" icon="plus" style={{ marginLeft: 10 }} onClick={this.onClick} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  skills: state.skills
});

const mapDispatchToProps = dispatch => ({
  addUserSkill: userSkill => dispatch({
    type: 'people/addUserSkill',
    payload: userSkill
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(SkillSelect);
