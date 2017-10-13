var express = require('express');
var router = express.Router();
//var usr=require('dao/dbConnect');
var jsdom = require("jsdom/lib/old-api.js");
var window = jsdom.jsdom().defaultView;
var $ = require("jquery")(window);
var model = require('../model/model');

/* GET home page. */

//用户名
var user_name = null;

router.get('/', function(req, res) {
   
if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
if(req.session.islogin){
    res.locals.islogin=req.session.islogin;
}
  res.render('index', { title: 'HOME',test:res.locals.islogin,Is_admin:false});
    
});


router.route('/login')
    .get(function(req, res) {
       if(req.session.islogin){
            res.locals.islogin=req.session.islogin;
        }

        if(req.cookies.islogin){
            req.session.islogin=req.cookies.islogin;
        }
        res.render('login', { title: '用户登录' ,test:res.locals.islogin,Is_admin : false});
    })
    .post(function(req, res) {
      //var param = req;
      model.loginAdminer(req.body.username, req.body.password,req,res);
      
      //登录部分
      
        
    }


    );

router.get('/logout', function(req, res) {
    res.clearCookie('islogin');
    req.session.destroy();
    res.redirect('/');
});

router.get('/home', function(req, res) {
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }
    if(req.cookies.islogin){
        req.session.islogin=req.cookies.islogin;
    }
    res.render('home', { title: 'Home', user: res.locals.islogin});
});

router.route('/reg')
    .get(function(req,res){
        res.render('reg',{title:'注册',Is_admin:false});
    })
    .post(function(req,res) {
       model.addAdminer(req.body.username ,req.body.password2,res);

       /*
        client = usr.connect();
     if(req.body.type == "用户"){
        usr.insertFun(client,"user_login",req.body.username ,req.body.password2, function (err) {
              if(err){ res.send("用户名重复");res.redirect('/');}
              user_name = req.body.username;
              res.send('注册成功');
        });
    }*/

    });

module.exports = router;
