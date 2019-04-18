const CONST = {
  // 反向代理host
  host: 'http://47.104.189.49:8008',
  // tab 菜单栏配置项
  menus: [
    {
      name: '下款牛市',
      path: '/loanMarket',
      in: require('@/assets/images/home-in.png'),
      out: require('@/assets/images/home-out.png')
    },
    {
      name: '我的',
      path: '/mine',
      in: require('@/assets/images/user-in.png'),
      out: require('@/assets/images/user-out.png')
    }
  ]
}

export default CONST
