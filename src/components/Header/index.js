import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Util from '../../utils/utils';
import axios from '../../axios';
import { connect } from 'react-redux';
import './index.less';

class Header extends Component {
  state = {};

  componentWillMount() {
    this.setState({
      userName: 'Chenxi'
    });

    // 定时器 时间
    setInterval(() => {
      let sysTime = Util.formateDate(new Date().getTime());
      this.setState({
        sysTime
      });
    }, 1000);

    // 调用获取天气信息函数
    this.getWeatherAPIData();
  }

  getWeatherAPIData() {
    let city = '厦门';
    axios
      .jsonp({
        url:
          'http://api.map.baidu.com/telematics/v3/weather?location=' +
          encodeURIComponent(city) +
          '&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
      })
      .then(res => {
        if (res.status === 'success') {
          let data = res.results[0].weather_data[0];
          this.setState({
            dayPictureUrl: data.dayPictureUrl,
            weather: data.weather
          });
        }
      });
  }

  render() {
    const menuType = this.props.menuType;
    return (
      <div className="header">
        <Row className="header-top">
          {/** 详情页面的导航里左侧是有一个图标的，在admin的页面里是没有这个，所以我们通过详情页面里使用Header组件时传递过来一个menuType来进行判断是哪个页面 */}
          {menuType ? (
            <Col span={6} className="logo">
              <img src="/assets/images/logo3.png" alt="" />
              <span>React Admin通用管理系统</span>
            </Col>
          ) : (
            ''
          )}
          <Col span={menuType ? 18 : 24}>
            <span>欢迎，{this.state.userName}</span>
            <a href="/" style={{ color: 'grey' }}>
              退出
            </a>
          </Col>
        </Row>
        {/** 详情页面不需要面包屑的，详情页面使用Header组件时传入menuType，我们可以根据这个值来判断是否要显示面包屑*/}
        {menuType ? (
          ''
        ) : (
          <Col className="breadcrumb">
            <Col span={4} className="breadcrumb-title">
              {this.props.menuName}
            </Col>
            <Col span={20} className="weather">
              <span className="date">{this.state.sysTime}</span>
              <span className="weather-img">
                <img src={this.state.dayPictureUrl} alt="" />
              </span>
              <span className="weather-detail">{this.state.weather}</span>
            </Col>
          </Col>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    menuName: state.menuName
  };
};

export default connect(
  mapStateToProps,
  null
)(Header);
