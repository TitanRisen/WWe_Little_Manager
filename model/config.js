var config = {
    database: 'project', // 使用哪个数据库
    username: 'adminer', // 用户名
    password: 'adminer123456', // 口令
    host: '139.199.83.61', // 主机名
    port: 3306, // 端口号，MySQL默认3306
    orderStatus:{
        pending:1,//待处理
        running:2,//已接单正在执行
        resolved:3,//已完成
        timeout:4,//超时
        deleted:5//取消的订单
    },
    appid:111111,
    appsecret:11111
};

module.exports = config;