import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { switchMenu } from '../../redux/action';
import MenuConfig from '../../config/menuConfig';
import { Menu } from 'antd';
import './index.less';

const { SubMenu } = Menu;

class NavLeft extends Component {
  state = {
    currentKey: ''
  };
  componentWillMount() {
    const menuTreeNode = this.renderMenu(MenuConfig);
    // let currentKey = window.location.hash.replace('#', '');
    let currentKey = window.location.hash.replace('/#|?.*$/g', '');
    this.setState({
      currentKey,
      menuTreeNode
    });
  }

  handleClick = ({ item, key }) => {
    const { dispatch } = this.props;
    dispatch(switchMenu(item.props.title));
    this.setState({
      currentKey: key
    });
  };

  // 菜单渲染
  renderMenu = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item title={item.title} key={item.key}>
          <NavLink to={item.key}>{item.title}</NavLink>
        </Menu.Item>
      );
    });
  };

  render() {
    return (
      <div>
        <div className="logo">
          <img src="/assets/images/logo3.png" alt="logo" />
          <h1>React Admin</h1>
        </div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={this.state.currentKey}
          theme="dark"
        >
          {this.state.menuTreeNode}
        </Menu>
      </div>
    );
  }
}

export default connect()(NavLeft);
