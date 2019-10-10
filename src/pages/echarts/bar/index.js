import React, { Component } from 'react';
import { Card } from 'antd';
import echartTheme from '../echartTheme';
// 按需加载
import echarts from 'echarts/lib/echarts';
// 导入柱形图
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';

export default class Bar extends Component {
  componentWillMount() {
    echarts.registerTheme('Admin', echartTheme);
  }

  getOption = () => {
    let option = {
      title: {
        text: '用户骑行订单'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单量',
          type: 'bar',
          data: [1000, 4000, 2000, 5000, 3300, 800, 1800]
        }
      ]
    };
    return option;
  };

  getOption2 = () => {
    let option = {
      title: {
        text: '用户骑行订单'
      },
      legend: {
        data: ['OFO单车', '摩拜单车', '小白单车']
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'OFO单车',
          type: 'bar',
          data: [1000, 2000, 3000, 5500, 7300, 8800, 12000]
        },
        {
          name: '摩拜单车',
          type: 'bar',
          data: [1500, 3000, 4500, 6000, 8000, 10000, 15000]
        },
        {
          name: '小白单车',
          type: 'bar',
          data: [800, 1600, 3000, 4000, 5300, 8000, 9900]
        }
      ]
    };
    return option;
  };

  render() {
    return (
      <div>
        <Card title="柱形图表之一">
          <ReactEcharts
            option={this.getOption()}
            theme="Admin"
            style={{ height: 500 }}
          />
        </Card>
        <Card title="柱形图表之二">
          <ReactEcharts
            option={this.getOption2()}
            theme="Admin"
            style={{ height: 500 }}
          />
        </Card>
      </div>
    );
  }
}
