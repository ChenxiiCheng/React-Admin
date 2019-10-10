import React, { Component } from 'react';
import { Input, Select, Form, Button, Checkbox, Radio, DatePicker } from 'antd';
import Utils from '../../utils/utils';

const FormItem = Form.Item;
const Option = Select.Option;

class FilterForm extends Component {
  /**
   * 用户点击表单中的 查询 按钮
   */
  handleFilterSubmit = () => {
    // 获取到用户在表单中输入的数据
    let fieldsValue = this.props.form.getFieldsValue();
    // 把获取到用户输入表单值传回给父级调用<BaseForm />那里, filterSubmit方法是父级使用BaseForm的地方传过来的，这个方法的目的是在父级那拿到用户输入的表单数据，然后根据表单数据发送数据请求
    this.props.filterSubmit(fieldsValue);
  };

  /**
   * 用户点击表单中的 重置 按钮
   */
  reset = () => {
    // antd表单里的属性resetFields
    this.props.form.resetFields();
  };

  initFormList = () => {
    const { getFieldDecorator } = this.props.form;
    const formList = this.props.formList;
    const formItemList = [];

    if (formList && formList.length > 0) {
      formList.forEach((item, index) => {
        let label = item.label;
        let field = item.field;
        let initialValue = item.initialValue || '';
        let placeholder = item.placeholder;
        let width = item.width;
        // 因为时间查询表单控件里面都是一样的，我们直接写个返回就行，它不像Input, select这些里面的值不一样
        if (item.type == '时间查询') {
          const begin_time = (
            <FormItem label="订单时间" key={field}>
              {getFieldDecorator('begin_time', {
                initialValue: initialValue
              })(
                <DatePicker
                  showTime={true}
                  placeholder={placeholder}
                  format="YYYY-MM-DD HH:mm:ss"
                />
              )}
            </FormItem>
          );
          formItemList.push(begin_time);
          const end_time = (
            <FormItem label="~" colon={false} key={field}>
              {getFieldDecorator('end_time', {
                initialValue: initialValue
              })(
                <DatePicker
                  showTime={true}
                  placeholder={placeholder}
                  format="YYYY-MM-DD HH:mm:ss"
                />
              )}
            </FormItem>
          );
          formItemList.push(end_time);
        } else if (item.type == 'INPUT') {
          const INPUT = (
            <FormItem label={label} key={field}>
              {getFieldDecorator([field], {
                initialValue: initialValue
              })(<Input type="text" placeholder={placeholder} />)}
            </FormItem>
          );
          formItemList.push(INPUT);
        } else if (item.type == 'SELECT') {
          const SELECT = (
            <FormItem label={label} key={field}>
              {getFieldDecorator([field], {
                initialValue: initialValue
              })(
                <Select style={{ width: width }} placeholder={placeholder}>
                  {Utils.getOptionList(item.list)}
                </Select>
              )}
            </FormItem>
          );
          formItemList.push(SELECT);
        } else if (item.type == 'CHECKBOX') {
          const CHECKBOX = (
            <FormItem label={label} key={field}>
              {getFieldDecorator([field], {
                valuePropName: 'checked',
                initialValue: initialValue // true | false
              })(<Checkbox>{label}</Checkbox>)}
            </FormItem>
          );
          formItemList.push(CHECKBOX);
        } else if (item.type == 'DATEPICKER') {
          const Date = (
            <FormItem label={label} key={field}>
              {getFieldDecorator([field])(
                <DatePicker
                  showTime={true}
                  placeholder={placeholder}
                  format="YYYY-MM-DD HH:mm:ss"
                />
              )}
            </FormItem>
          );
          formItemList.push(Date);
        }
      });
    }
    return formItemList;
  };

  render() {
    return (
      <div>
        <Form layout="inline">
          {this.initFormList()}
          <FormItem>
            <Button
              type="primary"
              style={{ margin: '0 20px' }}
              onClick={this.handleFilterSubmit}
            >
              查询
            </Button>
            <Button onClick={this.reset}>重置</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}
export default Form.create({})(FilterForm);
