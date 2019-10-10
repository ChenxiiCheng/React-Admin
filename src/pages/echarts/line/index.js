import React, { Component } from 'react';
import { Card } from 'antd';
import echartTheme from '../echartTheme';
// 按需加载
import echarts from 'echarts/lib/echarts';
// 导入饼图
import 'echarts/lib/chart/line';
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
          type: 'line',
          data: [1000, 2000, 1500, 4000, 2000, 1200, 600]
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
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['OFO订单量', '摩拜订单量']
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'OFO订单量',
          type: 'line',
          data: [1200, 3000, 4500, 6000, 7000, 12000, 20000]
        },
        {
          name: '摩拜订单量',
          type: 'line',
          data: [1000, 2000, 5500, 7000, 9000, 12000, 25000]
        }
      ]
    };
    return option;
  };

  getOption3 = () => {
    let option = {
      title: {
        text: '用户骑行订单'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单量',
          type: 'line',
          data: [1000, 2000, 1500, 3000, 3300, 1200, 900],
          areaStyle: {}
        }
      ]
    };
    return option;
  };

  render() {
    return (
      <div>
        <Card title="折线图表之一">
          <ReactEcharts
            option={this.getOption()}
            theme="Admin"
            style={{ height: 500 }}
          />
        </Card>
        <Card title="折线图表之二">
          <ReactEcharts
            option={this.getOption2()}
            theme="Admin"
            style={{ height: 500 }}
          />
        </Card>
        <Card title="折线图表之三">
          <ReactEcharts
            option={this.getOption3()}
            theme="Admin"
            style={{ height: 500 }}
          />
        </Card>
      </div>
    );
  }
}
