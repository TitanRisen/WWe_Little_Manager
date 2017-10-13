var config = require('./config');
var Sequelize = require('sequelize');
//数据库有关
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

var model = {};

//定义数据库模型
var information = sequelize.define('information',{
    openid:{
        type:Sequelize.STRING(60),
        primaryKey:true
    },
    photo:Sequelize.STRING(100)//文件路径
},{

    timestamps: false

});


//一般用户
var user = sequelize.define('user',{
    openid:{
        type:Sequelize.STRING(60),
        primaryKey:true
    },
    confirm:Sequelize.ENUM('yes','no')
},{
    timestamps: false,
    freezeTableName: true
});

//用户信息连接视图
var userInfo = sequelize.define('userInfo',{
    openid:{
        type:Sequelize.STRING(60),
        primaryKey:true
    },
    confirm:Sequelize.ENUM('yes','no'),
    photo:Sequelize.STRING(100)
},{
    timestamps: false,
    freezeTableName: true
});

//管理员模型
var adminer = sequelize.define('adminer',{
    name:{
        type:Sequelize.STRING(50),
        primaryKey:true
    },
    password:Sequelize.STRING(50)
},{
    timestamps: false,
    freezeTableName: true
});

var query = {}

//添加管理员
query.addAdminer = function(name , password,res){
    adminer.create({
        'name':name,
        'password':password
    }).catch(error=>{
        //console.log(error);
        res.render('reg',{title:'对不起，您的用户名重复！！！！',Is_admin:false});
    }).then(data=>{
        console.log(data);
        res.render('reg',{title:'恭喜，您已注册成功！',Is_admin:false});
    })
}

//管理员登录
query.loginAdminer = function(name , password,req,res){
    adminer.findOne({where:{name: name }})
    .then(data=>{
         if(data){
         if(data.password===password){
                req.session.islogin=req.body.username;
                res.locals.islogin=req.session.islogin;
                res.cookie('islogin',res.locals.islogin,{maxAge:60000});
                res.render('home', {title:"请审核用户" , Is_admin : true, user:name });
            }
            else
            {
                res.render('login', { title: '请输入正确的密码' ,test:null,Is_admin : false});
            }
        }
        else
        {
            res.render('login', { title: '不存在此用户' ,test:null,Is_admin : false});
        }
    })
     
}


//添加图片路径
query.addInfo = function (openid,photo){
    
    var info =  information.create({
        'openid' : openid,
        'photo':    photo
    });
}


//得到所有图片
query.getInfo = function(param,res,_openid){
            var temp;
            var infoList = [];
            /*information*/userInfo.findAll({where: {openid: {'$ne':null}}})
            .then(datas=>{   
                for(var i = 0; i < datas.length; i++){
                    var data = {};
                    data.openid = datas[i].openid;
                    
                    //一定一定要设置好uploads的静态目录
                    var photoRoute =(datas[i].photo).split("/");
                    data.photo = photoRoute[photoRoute.length - 1];

                    console.log(data);
                    infoList.push(data);
                }
            res.render('judge',{datas:infoList, _openid:_openid});


                //res.send(orderList.slice(0, 10));
              /*  Task.findAll({limit : 10, age:{gt:3},order : 'id asc'}, {raw : true, logging : true, plain : false}).
                on('success', function(res){
                              console.log(res);
                        })*/
            });
}
query.updateUser = function(openid, confirm,res){
    var temp = user.update(
    {'confirm': confirm},
    {
        'where': {
            'openid': openid
        }
    }
)/*.on('success', function(msg){
    console.log(msg);
    res.send("成功审核")
}).on('failure', function(err){
    console.log(err);
    res.send('fail');
})*/.then(data => {
    console.log(data);
    //res.send('SUCCESS');
}).catch(function (err_) {
    console.log(err_);
    //res.send('fafea');
   });

//console.log(temp);
}




/*
model.Form = sequelize.define('form', {
    ID: {
        type: Sequelize.STRING(14),
        primaryKey: true
    },
    openid:Sequelize.STRING(200),
    form_status: Sequelize.ENUM('未接单', '正进行', '已完成', '正投诉'),
    submit_time: Sequelize.DATE(),//日期有问题
    describle: Sequelize.STRING(200),
    destination: Sequelize.STRING(200),
    price: Sequelize.NUMERIC(3, 1),
    time_limit: Sequelize.NUMERIC(3, 1),
    service_type: Sequelize.ENUM('带饭', '带快递', '买东西', '自定义')
}, {
        timestamps: false,
        freezeTableName: true//  取消自动+s
    });
*/
module.exports = query;