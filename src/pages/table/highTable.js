import React, { Component } from 'react';
import { Card, Table, message, Badge, Modal } from 'antd';
import axios from '../../axios';

export default class highTable extends Component {
  state = {};
  params = {
    page: 1
  };

  componentDidMount() {
    this.request();
  }

  /**
   * 动态获取mock数据
   */
  request = () => {
    axios
      .ajax({
        url: '/table/high/list',
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
            dataSource2: res.result.list
          });
        }
      });
  };

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      sortOrder: sorter.order
    });
  };

  // 删除操作
  handleDelete = item => {
    //let id = item.id;
    Modal.confirm({
      title: '确认',
      content: '确认要删除此条数据吗？',
      onOk: () => {
        message.success('删除成功');
        this.request();
      }
    });
  };

  render() {
    const columns = [
      {
        title: 'id',
        key: 'id',
        width: 80,
        dataIndex: 'id'
      },
      {
        title: '用户名',
        key: 'userName',
        width: 80,
        dataIndex: 'userName'
      },
      {
        title: '性别',
        key: 'sex',
        width: 80,
        dataIndex: 'sex',
        render(sex) {
          return sex === 1 ? '男' : '女';
        }
      },
      {
        title: '状态',
        key: 'state',
        width: 80,
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
        key: 'interest',
        width: 80,
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
        key: 'birthday',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        key: 'address',
        width: 120,
        dataIndex: 'address'
      },
      {
        title: '早期时间',
        key: 'time',
        width: 80,
        dataIndex: 'time'
      }
    ];

    const columns2 = [
      {
        title: 'id',
        key: 'id',
        width: 80,
        fixed: 'left',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        key: 'userName',
        fixed: 'left',
        dataIndex: 'userName'
      },
      {
        title: '性别',
        key: 'sex',
        width: 80,
        dataIndex: 'sex',
        render(sex) {
          return sex === 1 ? '男' : '女';
        }
      },
      {
        title: '状态',
        key: 'state',
        width: 80,
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
        key: 'interest',
        width: 80,
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
        key: 'birthday',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日2',
        key: 'birthday2',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日3',
        key: 'birthday3',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日4',
        key: 'birthday4',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日5',
        key: 'birthday5',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日6',
        key: 'birthday6',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日7',
        key: 'birthday7',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日8',
        key: 'birthday8',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '生日9',
        key: 'birthday9',
        width: 80,
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        key: 'address',
        width: 120,
        fixed: 'right',
        dataIndex: 'address'
      },
      {
        title: '早期时间',
        key: 'time',
        width: 80,
        fixed: 'right',
        dataIndex: 'time'
      }
    ];

    const columns3 = [
      {
        title: 'id',
        key: 'id',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        key: 'userName',
        dataIndex: 'userName'
      },
      {
        title: '性别',
        key: 'sex',
        dataIndex: 'sex',
        render(sex) {
          return sex === 1 ? '男' : '女';
        }
      },
      {
        title: '年龄',
        key: 'age',
        dataIndex: 'age',
        sorter: (a, b) => {
          return a.age - b.age;
        },
        sortOrder: this.state.sortOrder
      },
      {
        title: '状态',
        key: 'state',
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
        key: 'interest',
        dataIndex: 'interest',
        render(interest) {
          let config = {
            '1': <Badge status="success" text="游泳" />,
            '2': <Badge status="error" text="打篮球" />,
            '3': <Badge status="default" text="踢足球" />,
            '4': <Badge status="processing" text="跑步" />,
            '5': <Badge status="warning" text="爬山" />,
            '6': <Badge status="success" text="骑行" />,
            '7': <Badge status="error" text="桌球" />,
            '8': <Badge status="default" text="麦霸" />
          };
          return config[interest];
        }
      },
      {
        title: '生日',
        key: 'birthday',
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        key: 'address',
        dataIndex: 'address'
      },
      {
        title: '操作',
        key: 'operate',
        render: (text, item) => {
          return (
            <a
              href="/"
              alt=""
              onClick={item => {
                this.handleDelete(item);
              }}
            >
              删除
            </a>
          );
        }
      }
    ];

    const columns4 = [
      {
        title: 'id',
        key: 'id',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        key: 'userName',
        dataIndex: 'userName'
      },
      {
        title: '性别',
        key: 'sex',
        dataIndex: 'sex',
        render(sex) {
          return sex === 1 ? '男' : '女';
        }
      },
      {
        title: '年龄',
        key: 'age',
        dataIndex: 'age',
        sorter: (a, b) => {
          return a.age - b.age;
        },
        sortOrder: this.state.sortOrder
      },
      {
        title: '状态',
        key: 'state',
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
        key: 'interest',
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
        key: 'birthday',
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        key: 'address',
        dataIndex: 'address'
      },
      {
        title: '早期时间',
        key: 'time',
        dataIndex: 'time'
      }
    ];
    return (
      <div>
        <Card title="头部固定">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
            scroll={{ y: 240 }}
          />
        </Card>
        <Card title="左侧固定" style={{ margin: '15px 0' }}>
          <Table
            bordered
            columns={columns2}
            dataSource={this.state.dataSource2}
            pagination={false}
            scroll={{ x: 1318 }}
          />
        </Card>
        <Card title="表格排序" style={{ margin: '15px 0' }}>
          <Table
            bordered
            columns={columns3}
            dataSource={this.state.dataSource2}
            pagination={false}
            onChange={this.handleChange}
          />
        </Card>
        <Card title="操作按钮" style={{ margin: '15px 0' }}>
          <Table
            bordered
            columns={columns4}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>
      </div>
    );
  }
}
