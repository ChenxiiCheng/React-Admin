import React, { Component } from 'react';
import { Card, Spin, Icon, Alert } from 'antd';
import './ui.less';

export default class Loading extends Component {
  render() {
    const icon = <Icon type="loading" style={{ fontSize: 24 }} />;
    const iconLoading = <Icon type="loading" style={{ fontSize: 24 }} />;
    return (
      <div>
        <Card title="Spin用法" className="card-wrap">
          <Spin size="small" />
          <Spin style={{ margin: '0 15px' }} />
          <Spin size="large" />
          <Spin indicator={icon} style={{ marginLeft: 10 }} />
        </Card>
        <Card title="内容遮罩">
          <Alert
            message="React"
            description="欢迎来到React Admin"
            type="info"
          />
          <Alert
            message="React"
            description="欢迎来到React Admin"
            type="warning"
            style={{ marginTop: 15 }}
          />
          <Spin>
            <Alert
              message="React"
              description="欢迎来到React Admin"
              type="success"
              style={{ marginTop: 15 }}
            />
          </Spin>

          <Spin indicator={iconLoading}>
            <Alert
              message="React"
              description="欢迎来到React Admin"
              type="info"
              style={{ marginTop: 15 }}
            />
          </Spin>
        </Card>
      </div>
    );
  }
}
