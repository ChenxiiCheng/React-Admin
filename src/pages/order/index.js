import React, { Component } from 'react';
import { Card, Button, Table, Form, Select, Modal, message } from 'antd';
import axios from '../../axios';
import Utils from '../../utils/utils';
import BaseForm from '../../components/baseForm';
import ETable from '../../components/ETable';

const FormItem = Form.Item;

export default class Order extends Component {
  state = {
    orderInfo: {},
    orderConfirmVisible: false
  };
  params = {
    page: 1
  };

  formList = [
    {
      type: 'SELECT',
      label: '城市',
      field: 'city',
      placeholder: '全部',
      initialValue: '0',
      width: 80,
      list: [
        {
          id: '0',
          name: '全部'
        },
        {
          id: '1',
          name: '北京市'
        },
        {
          id: '2',
          name: '上海市'
        },
        {
          id: '3',
          name: '深圳市'
        }
      ]
    },
    {
      type: '时间查询'
    },
    {
      type: 'SELECT',
      label: '订单状态',
      field: 'order_status',
      placeholder: '全部',
      initialValue: '0',
      width: 80,
      list: [
        {
          id: '0',
          name: '全部'
        },
        {
          id: '1',
          name: '进行中'
        },
        {
          id: '2',
          name: '结束行程'
        }
      ]
    }
  ];

  componentDidMount() {
    this.requestList();
  }

  /**
   * 请求数据
   */
  requestList = () => {
    axios.requestList(this, '/order/list', this.params, true);

    //把requestList封装到axios/index.js中了
    // axios
    //   .ajax({
    //     url: '/order/list',
    //     data: {
    //       params: this.params
    //     }
    //   })
    //   .then(res => {
    //     let list = res.result.item_list.map((item, index) => {
    //       item.key = index;
    //       return item;
    //     });
    //     this.setState({
    //       list,
    //       pagination: Utils.pagination(res, current => {
    //         _this.params.page = current;
    //         _this.requestList();
    //       })
    //     });
    //   });
  };

  // 订单结束确认
  handleConfirm = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.info({
        title: '信息',
        content: '请选择一条订单进行结束'
      });
      return;
    }
    axios
      .ajax({
        url: '/order/ebike_info',
        data: {
          params: {
            orderId: item.id
          }
        }
      })
      .then(res => {
        if (res.code == 0) {
          this.setState({
            orderInfo: res.result,
            orderConfirmVisible: true
          });
        }
      });
  };

  /**
   * 使用BaseForm时传递给子组件的函数方法
   */
  handleFilter = params => {
    this.params = params;
    this.requestList();
  };

  /**
   * 结束订单
   */
  handleFinishOrder = () => {
    let item = this.state.selectedItem;
    axios
      .ajax({
        url: '/order/finish_order',
        data: {
          params: {
            orderId: item.id
          }
        }
      })
      .then(res => {
        if (res.code == 0) {
          message.success('订单结束成功');
          this.setState({
            orderConfirmVisible: false
          });
          this.requestList();
        }
      });
  };

  /**
   * 因为封装了Table，这些不需要了
   */
  // onRowClick = (record, index) => {
  //   let selectKey = [index];
  //   this.setState({
  //     selectedRowKeys: selectKey, // 选中项的索引
  //     selectedItem: record // 选中项
  //   });
  // };

  // 订单详情
  openOrderDetail = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.info({
        title: '信息',
        content: '请先选择一条订单'
      });
      return;
    }
    window.open(`/#/common/order/detail/${item.id}`, '_blank');
    // window.location.href = `/#/common/order/detail/${item.id}`;
  };

  render() {
    const columns = [
      {
        title: '订单编号',
        dataIndex: 'order_sn'
      },
      {
        title: '车辆编号',
        dataIndex: 'bike_sn'
      },
      {
        title: '用户名',
        dataIndex: 'user_name'
      },
      {
        title: '手机号码',
        dataIndex: 'mobile'
      },
      {
        title: '里程',
        dataIndex: 'distance',
        render(distance) {
          return distance / 1000 + 'km';
        }
      },
      {
        title: '行驶时长',
        dataIndex: 'total_time'
      },
      {
        title: '状态',
        dataIndex: 'status'
      },
      {
        title: '开始时间',
        dataIndex: 'start_time'
      },
      {
        title: '结束时间',
        dataIndex: 'end_time'
      },
      {
        title: '订单金额',
        dataIndex: 'total_fee'
      },
      {
        title: '实付金额',
        dataIndex: 'user_pay'
      }
    ];

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    };

    /**
     * 因为封装了Table，所以这些不再需要了
     */
    // const selectedRowKeys = this.state.selectedRowKeys;
    // const rowSelection = {
    //   type: 'radio',
    //   selectedRowKeys
    // };

    return (
      <div>
        <Card>
          {/* 我们使用BaseForm，就不需要<FilterForm />了 */}
          <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
        </Card>
        <Card style={{ marginTop: 10 }}>
          <Button type="primary" onClick={this.openOrderDetail}>
            订单详情
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: 10 }}
            onClick={this.handleConfirm}
          >
            结束订单
          </Button>
        </Card>
        <div className="content-wrap">
          <ETable
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            columns={columns}
            dataSource={this.state.list}
            selectedRowKeys={this.state.selectedRowKeys}
            selectedItem={this.state.selectedItem}
            pagination={this.state.pagination}
          />
          {/* <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index);
                }
              };
            }}
          /> */}
        </div>
        <Modal
          title="结束订单"
          visible={this.state.orderConfirmVisible}
          onCancel={() => {
            this.setState({
              orderConfirmVisible: false
            });
          }}
          onOk={this.handleFinishOrder}
          width={600}
        >
          <Form layout="horizontal">
            <FormItem label="车辆编号" {...formItemLayout}>
              {this.state.orderInfo.bike_sn}
            </FormItem>
            <FormItem label="剩余电量" {...formItemLayout}>
              {this.state.orderInfo.battery + '%'}
            </FormItem>
            <FormItem label="行程开始时间" {...formItemLayout}>
              {this.state.orderInfo.start_time}
            </FormItem>
            <FormItem label="当前位置" {...formItemLayout}>
              {this.state.orderInfo.location}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}
