import React, { Component } from 'react';
import { Card, Table, Modal, Button, message } from 'antd';
import axios from '../../axios';
import Utils from '../../utils/utils';

export default class basicTable extends Component {
  state = {
    dataSource2: ''
  };
  params = {
    page: 1
  };
  componentDidMount() {
    const dataSource = [
      {
        id: '0',
        userName: 'Jack',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '厦门市思明区中山路',
        time: '09:00'
      },
      {
        id: '1',
        userName: 'Tom',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '厦门市思明区中山路',
        time: '09:00'
      },
      {
        id: '2',
        userName: 'Jack',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '厦门市思明区中山路',
        time: '09:00'
      }
    ];
    dataSource.map((item, index) => {
      return (item.key = index);
    });
    this.setState({
      dataSource
    });

    this.request();
  }

  /**
   * 动态获取mock数据
   */
  request = () => {
    let _this = this;
    axios
      .ajax({
        url: '/table/list',
        data: {
          params: {
            page: this.params.page
          }
        }
      })
      .then(res => {
        if (res.code === 0) {
          res.result.list.map((item, index) => {
            return (item.key = index);
          });
          this.setState({
            dataSource2: res.result.list,
            pagination: Utils.pagination(res, current => {
              _this.params.page = current;
              this.request();
            }),
            // 删除后，再刷新页面的时候需要将state里的选中项和选中项索引清空
            selectedRowKeys: [],
            selectedRows: null
          });
        }
      });
  };

  onRowClick = (record, index) => {
    let selectKey = [index];
    Modal.info({
      title: '消息',
      content: `用户名：${record.userName}, 用户爱好：${record.interest}`
    });
    this.setState({
      selectedRowKeys: selectKey, // 选中项的索引
      selectedItem: record // 选中项
    });
  };

  /**
   * 多选执行删除动作
   */
  handleDelete = () => {
    let rows = this.state.selectedRows;
    // 删除是根据id来的
    let ids = [];
    rows.map(item => {
      return ids.push(item.id);
    });
    Modal.confirm({
      title: '删除提示',
      content: `确定要删除这些数据吗? ${ids.join(',')}`,
      onOk: () => {
        message.success('删除成功');
        // 删除后，刷新页面
        this.request();
      }
    });
  };

  render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'userName'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex === 1 ? '男' : '女';
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(state) {
          let config = {
            '1': '咸鱼一条',
            '2': '风华浪子',
            '3': '北大才子',
            '4': '百度FE',
            '5': '创业者'
          };
          return config[state];
        }
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        render(interest) {
          let config = {
            '1': '游泳',
            '2': '打篮球',
            '3': '踢足球',
            '4': '跑步',
            '5': '爬山',
            '6': '骑行',
            '7': '桌球',
            '8': '麦霸'
          };
          return config[interest];
        }
      },
      {
        title: '生日',
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        dataIndex: 'address'
      },
      {
        title: '早期时间',
        dataIndex: 'time'
      }
    ];
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    };
    const rowMoreSelection = {
      type: 'checkbox',
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys,
          selectedRows
        });
      }
    };
    return (
      <div>
        <Card title="基础表格">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={false}
          />
        </Card>
        <Card title="动态数据渲染表格" style={{ margin: '15px 0' }}>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>
        <Card title="Mock-单选" style={{ margin: '15px 0' }}>
          <Table
            bordered
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index);
                }
              };
            }}
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>
        <Card title="Mock-多选" style={{ margin: '15px 0' }}>
          <div style={{ marginBottom: 15 }}>
            <Button onClick={this.handleDelete}>删除</Button>
          </div>
          <Table
            bordered
            rowSelection={rowMoreSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index);
                }
              };
            }}
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>
        <Card title="Mock-表格分页" style={{ margin: '15px 0' }}>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={true}
          />
        </Card>
      </div>
    );
  }
}
