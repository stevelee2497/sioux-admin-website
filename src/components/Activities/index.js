import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Avatar, Button } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import { parseImage } from '../../utils/images';

class Activities extends Component {
  render() {
    const { employees, task: { taskActions } } = this.props;
    return _.map(taskActions, action => {
      const member = employees[action.userId];
      return (
        <div key={action.id} style={{ display: 'flex', marginRight: 25, marginTop: 10, alignItems: 'center' }}>
          <Avatar style={{ marginTop: 10 }} src={parseImage(member.avatarUrl)} />
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 5, fontSize: 13 }}>
            <div>
              <Button type="link" style={{ padding: 0, marginRight: 5 }}>
                <h4 style={{ margin: 0 }}>{member.fullName}</h4>
              </Button>
              {action.actionDescription}
            </div>
            <p style={{ marginTop: -3, marginBottom: 0 }}>{moment(action.createdTime).format('DD/MM/YYYY HH:mm')}</p>
          </div>
        </div>
      );
    });
  }
}

const mapStateToProps = ({
  projects: { selectedProject: { users: employees } },
}) => ({
  employees,
});

const mapDispatchToProps = {

};
export default connect(mapStateToProps, mapDispatchToProps)(Activities);
