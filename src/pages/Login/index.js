import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button, Icon, Form, Spin } from 'antd';
import styles from './index.less';

class Login extends Component {
  handleSubmit = e => {
    const { form, login } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        login(values);
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      loading
    } = this.props;
    return (
      <div className={styles.container}>
        <Spin spinning={loading.global}>
          <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
            <h1>Login</h1>
            <Form.Item className={styles.input}>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  placeholder="userName"
                  size="large"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />,
              )}
            </Form.Item>

            <Form.Item className={styles.input}>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  size="large"
                  placeholder="password"
                />,
              )}
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              size="large"
              className={styles.button}
            >
              Login
            </Button>
          </Form>
        </Spin>
      </div>
    );
  }
}

const WrappedLoginForm = Form.create({ name: 'login' })(Login);

const mapStateToProps = state => ({ loading: state.loading });

const mapDispatchToProps = dispatch => ({
  login: values => dispatch({ type: 'passport/login', payload: values }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WrappedLoginForm);
