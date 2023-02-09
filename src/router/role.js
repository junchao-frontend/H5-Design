

const role1 = [
    { icon: 'cluster-o', name: '环保', path: "/huanbao" },
    { icon: 'user-o', name: '我的', path: "/my" },
]
const role2 = [
    { icon: 'qr', name: '工艺', path: "/graphitization" },
    { icon: 'cluster-o', name: '环保', path: "/huanbao" },
    { icon: 'orders-o', name: '平衡表', path: "/balance" },
    { icon: 'bullhorn-o', name: '告警', path: '/warn' },
    { icon: 'user-o', name: '我的', path: "/my" },
]
const role3 = [
    { icon: 'qr', name: '工艺', path: "/graphitization" },
    { icon: 'cluster-o', name: '环保', path: "/huanbao" },
    { icon: 'user-o', name: '我的', path: "/my" },
]

// 底部一级菜单
const allRole = {
    手机环保管理员: role1,
    手机管理员: role2,
    超级管理员: role2,
    test: role2,
    // 2022/4/29
    石墨化库管: role3,
    隧道窑库管: role3
}
export { allRole }