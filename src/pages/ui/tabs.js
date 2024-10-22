import React, { Component } from 'react';
import { Card, Tabs, message, Icon } from 'antd';

const { TabPane } = Tabs;

export default class tabs extends Component {
  newTabIndex = 0;
  componentWillMount() {
    const panes = [
      {
        title: 'Tab1',
        content: 'Tab 1',
        key: '1'
      },
      {
        title: 'Tab2',
        content: 'Tab 2',
        key: '2'
      },
      {
        title: 'Tab3',
        content: 'Tab 3',
        key: '3'
      }
    ];
    this.setState({
      activeKey: panes[0].key,
      panes
    });
  }

  callback = key => {
    message.info('Hi, 您选择了页签: ' + key);
  };

  onChange = activeKey => {
    this.setState({
      activeKey
    });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const { panes } = this.state;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({
      title: activeKey,
      content: 'Content of new Tab',
      key: activeKey
    });
    this.setState({ panes, activeKey });
  };

  remove = targetKey => {
    let { activeKey } = this.state;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  };

  render() {
    return (
      <div>
        <Card title="Tab页签" className="card-wrap">
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="Tab 1" key="1">
              欢迎来到React Admin
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              欢迎来到Vue Admin
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              欢迎学习Flutter
            </TabPane>
          </Tabs>
        </Card>
        <Card title="Tab带图的页签" className="card-wrap">
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane
              tab={
                <span>
                  <Icon type="plus" />
                  Tab 1
                </span>
              }
              key="1"
            >
              欢迎来到React Admin
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="edit" />
                  Tab 2
                </span>
              }
              key="2"
              disabled
            >
              欢迎来到Vue Admin
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="delete" />
                  Tab 3
                </span>
              }
              key="3"
            >
              欢迎学习Flutter
            </TabPane>
          </Tabs>
        </Card>

        <Card title="可编辑的Tab页签" className="card-wrap">
          <Tabs
            onChange={this.onChange}
            activeKey={this.state.activeKey}
            type="editable-card"
            onEdit={this.onEdit}
          >
            {this.state.panes.map(panel => {
              return <TabPane tab={panel.title} key={panel.key} />;
            })}
          </Tabs>
        </Card>
      </div>
    );
  }
}
