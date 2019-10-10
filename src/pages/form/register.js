import React, { Component } from 'react';
import {
  Card,
  Form,
  Button,
  Input,
  Checkbox,
  Radio,
  Select,
  Switch,
  DatePicker,
  TimePicker,
  Upload,
  Icon,
  message,
  InputNumber
} from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

class FormRegister extends Component {
  state = {};

  handleSubmit = () => {
    let userInfo = this.props.form.getFieldsValue();
    message.success(
      `${userInfo.userName} 恭喜你，通过本次学习，你的密码是${userInfo.userPwd}`
    );
  };

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          userImg: imageUrl,
          loading: false
        })
      );
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: 24,
        sm: 4
      },
      wrapperCol: {
        xs: 24,
        sm: 12
      }
    };
    const offsetLayout = {
      wrapperCol: {
        xs: 24,
        sm: {
          span: 12,
          offset: 4
        }
      }
    };
    return (
      <div>
        <Card title="注册表单">
          <Form layout="horizontal">
            <FormItem label="用户名" {...formItemLayout}>
              {getFieldDecorator('userName', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: '用户名不能为空'
                  }
                ]
              })(<Input placeholder="Please type loginname" />)}
            </FormItem>
            <FormItem label="密码" {...formItemLayout}>
              {getFieldDecorator('userPwd', {
                initialValue: ''
              })(<Input type="password" placeholder="Please type password" />)}
            </FormItem>
            <FormItem label="性别" {...formItemLayout}>
              {getFieldDecorator('sex', {
                initialValue: '1'
              })(
                <Radio.Group>
                  <Radio value="1">男</Radio>
                  <Radio value="2">女</Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem label="年龄" {...formItemLayout}>
              {getFieldDecorator('age', {
                initialValue: 18
              })(<InputNumber />)}
            </FormItem>
            <FormItem label="当前状态" {...formItemLayout}>
              {getFieldDecorator('state', {
                initialValue: '2'
              })(
                <Select>
                  <Option value="1">咸鱼一条</Option>
                  <Option value="2">风华浪子</Option>
                  <Option value="3">北大才子</Option>
                  <Option value="4">百度FE</Option>
                  <Option value="5">创业者</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="爱好" {...formItemLayout}>
              {getFieldDecorator('interest', {
                initialValue: ['2', '5']
              })(
                <Select mode="multiple">
                  <Option value="1">游泳</Option>
                  <Option value="2">打篮球</Option>
                  <Option value="3">跑步</Option>
                  <Option value="4">桌球</Option>
                  <Option value="5">麦霸</Option>
                  <Option value="6">骑行</Option>
                  <Option value="7">踢足球</Option>
                  <Option value="8">晒太阳</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label="是否已婚" {...formItemLayout}>
              {getFieldDecorator('isMarried', {
                initialValue: true,
                valuePropName: 'checked'
              })(<Switch />)}
            </FormItem>
            <FormItem label="生日" {...formItemLayout}>
              {getFieldDecorator('birthday', {
                initialValue: moment('2019-09-09 12:00:59')
              })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
            </FormItem>
            <FormItem label="联系地址" {...formItemLayout}>
              {getFieldDecorator('address', {
                initialValue: '厦门市思明区中山路'
              })(
                <TextArea
                  autosize={{
                    minRows: 4,
                    maxRows: 6
                  }}
                />
              )}
            </FormItem>
            <FormItem label="早期时间" {...formItemLayout}>
              {getFieldDecorator('time')(<TimePicker />)}
            </FormItem>
            <FormItem label="头像" {...formItemLayout}>
              {getFieldDecorator('userImg')(
                <Upload
                  listType="picture-card"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  onChange={this.handleChange}
                >
                  {this.state.userImg ? (
                    <img src={this.state.userImg} alt="" />
                  ) : (
                    <Icon type="plus" />
                  )}
                </Upload>
              )}
            </FormItem>
            <FormItem {...offsetLayout}>
              {getFieldDecorator('userKnow')(
                <Checkbox>
                  我已经阅读过
                  <a href="/" alt="">
                    协议
                  </a>
                </Checkbox>
              )}
            </FormItem>
            <FormItem {...offsetLayout}>
              <Button type="primary" onClick={this.handleSubmit}>
                注册
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(FormRegister);
