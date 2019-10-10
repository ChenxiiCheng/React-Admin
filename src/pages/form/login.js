import React, { Component } from 'react';
import { Card, Form, Button, Input, Icon, message, Checkbox } from 'antd';

const FormItem = Form.Item;

class FormLogin extends Component {
  handleSubmit = () => {
    let userInfo = this.props.form.getFieldsValue();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.success(
          `${userInfo.userName} 恭喜你，通过本次学习，你的密码是${userInfo.userPwd}`
        );
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card title="登录行内表单">
          <Form layout="inline">
            <FormItem>
              <Input placeholder="Please type loginname" />
            </FormItem>
            <FormItem>
              <Input placeholder="Please type password" />
            </FormItem>
            <FormItem>
              <Button type="primary">Login</Button>
            </FormItem>
          </Form>
        </Card>
        <Card title="登录水平表单" style={{ marginTop: 15 }}>
          <Form style={{ width: 300 }}>
            <FormItem>
              {getFieldDecorator('userName', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: '用户名不能为空'
                  },
                  {
                    min: 5,
                    max: 10,
                    message: '长度不在范围内'
                  },
                  {
                    pattern: new RegExp('^\\w+$', 'g'),
                    message: '用户名必须为字母或者数字'
                  }
                ]
              })(
                <Input
                  prefix={<Icon type="user" />}
                  placeholder="Please type loginname"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('userPwd', {
                initialValue: '',
                rules: []
              })(
                <Input
                  prefix={<Icon type="lock" />}
                  placeholder="Please type password"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true
              })(<Checkbox>记住密码</Checkbox>)}
              <a href="/" style={{ float: 'right' }}>
                忘记密码
              </a>
            </FormItem>
            <FormItem>
              <Button type="primary" onClick={this.handleSubmit}>
                Login
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(FormLogin);
