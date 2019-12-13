import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Avatar, Input, Button, Spin } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import styles from './index.less';
import { parseImage } from '../../utils/images';

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commentContent: ''
    };
  }

  handleChanged = (event) => {
    this.setState({ commentContent: event.target.value });
  }

  handleCommentClick = () => {
    const { createComment, profile, taskId } = this.props;
    const { commentContent } = this.state;
    if (commentContent) {
      createComment({
        content: this.state.commentContent,
        userId: profile.id,
        taskId
      });
      this.setState({ commentContent: '' });
    }
  }

  renderComments = (comments) => {
    const { employees } = this.props;
    return _.map(comments, comment => {
      const member = employees[comment.userId];
      return (
        <div key={comment.id} style={{ display: 'flex', marginRight: 25, marginTop: 10, alignItems: 'center' }}>
          <Avatar style={{ marginTop: 10 }} src={parseImage(member.avatarUrl)} />
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 5, fontSize: 13 }}>
            <div>
              <Button type="link" style={{ padding: 0, marginRight: 5 }}>
                <h4 style={{ margin: 0 }}>{member.fullName}</h4>
              </Button>
              {comment.content}
            </div>
            <p style={{ marginTop: -3, marginBottom: 0 }}>{moment(comment.createdTime).format('DD/MM/YYYY HH:mm')}</p>
          </div>
        </div>
      );
    });
  }

  render() {
    const { comments, profile, loading } = this.props;
    const { commentContent } = this.state;
    return (
      <Spin spinning={loading}>
        <div style={{ display: 'flex', marginRight: 25, marginTop: 10 }}>
          <Avatar src={parseImage(profile.avatarUrl)} />
          <div style={{ flex: 1 }}>
            <Input.TextArea
              name="comment"
              autosize={{ minRows: 2 }}
              value={commentContent}
              onChange={this.handleChanged}
              className={styles.comment}
              placeholder="Add a comment ..."
            />
            <Button type="primary" style={{ margin: 5 }} onClick={this.handleCommentClick}>Comment</Button>
          </div>
        </div>
        {this.renderComments(comments)}
      </Spin>
    );
  }
}

const mapStateToProps = ({
  people: { employees },
  modals: { taskId },
  comments,
  loading: { effects }
}) => ({
  employees,
  taskId,
  comments: comments[taskId],
  loading: effects['comments/createComment'] === true
});

const mapDispatchToProps = dispatch => ({
  createComment: comment => dispatch({
    type: 'comments/createComment',
    payload: comment
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
