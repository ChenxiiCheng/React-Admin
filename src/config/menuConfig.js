const menuList = [
  {
    title: '首页 / Home',
    key: '/home'
  },
  {
    title: 'UI',
    key: '/ui',
    children: [
      {
        title: '按钮 / Button',
        key: '/ui/buttons'
      },
      {
        title: '弹框 / Modals',
        key: '/ui/modals'
      },
      {
        title: 'Loading / Loading',
        key: '/ui/loadings'
      },
      {
        title: '通知提醒 / Notification',
        key: '/ui/notification'
      },
      {
        title: '全局Message / Message',
        key: '/ui/messages'
      },
      {
        title: 'Tab页签 / Tabs',
        key: '/ui/tabs'
      },
      {
        title: '图片画廊 / Gallery',
        key: '/ui/gallery'
      },
      {
        title: '轮播图 / Carousel',
        key: '/ui/carousel'
      }
    ]
  },
  {
    title: '表单 / Form',
    key: '/form',
    children: [
      {
        title: '登录 / Login',
        key: '/form/login'
      },
      {
        title: '注册 / Register',
        key: '/form/reg'
      }
    ]
  },
  {
    title: '表格 / Table',
    key: '/table',
    children: [
      {
        title: '基础表格 / Basic',
        key: '/table/basic'
      },
      {
        title: '高级表格 / Advanced',
        key: '/table/high'
      }
    ]
  },
  {
    title: '富文本 / Editor',
    key: '/rich'
  },
  {
    title: '城市管理 / City',
    key: '/city'
  },
  {
    title: '订单管理 / Order',
    key: '/order',
    btnList: [
      {
        title: '订单详情 / Detail',
        key: 'detail'
      },
      {
        title: '结束订单 / Finished',
        key: 'finish'
      }
    ]
  },
  {
    title: '员工管理 / Employee',
    key: '/user'
  },
  {
    title: '图标 / Charts',
    key: '/charts',
    children: [
      {
        title: '柱形图 / Bar',
        key: '/charts/bar'
      },
      {
        title: '饼图 / Pie',
        key: '/charts/pie'
      },
      {
        title: '折线图 / Line',
        key: '/charts/line'
      }
    ]
  },
  {
    title: '权限设置 / Permission',
    key: '/permission'
  }
];
export default menuList;
