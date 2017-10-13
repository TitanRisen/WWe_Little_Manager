
//var appid = 'wx8f485c657374ad07';
//var secret = 'c655bf4e92189552c2fcbcda148f994a';
var express = require('express');
const Sequelize = require('sequelize');
//const config = require('../model/config');
var model = require('../model/model');
var router = express.Router();

//multer
var multer = require("multer");
var test_config = require('./test_configs');
var md5 = require('md5')

var storage = multer.diskStorage({
    //设置上传文件路径
    //Note:如果你传递的是一个函数，你负责创建文件夹，如果你传递的是一个字符串，multer会自动创建
    destination: test_config.upload.path,
    //TODO:文件区分目录存放
    //获取文件MD5，重命名，添加后缀,文件重复会直接覆盖
    filename: function (req, file, cb) {
        var fileFormat =(file.originalname).split(".");
        cb(null, /*file.fieldname + '_' +*/ /*md5(file) */req.body.openid + "." + fileFormat[fileFormat.length - 1]);
    }
});

//添加配置文件到muler对象。
var upload = multer({
    storage: storage,
    //其他设置请参考multer的limits
    //limits:{}
});



router.post('/',upload.single('photo'),function (req, res, next) {
  
  //upload.single('photo');
    if (req.file) {
        res.send('文件上传成功')
        console.log(req.body.openid);
        console.log(md5(req.file));
        console.log(req.file.path);
        //暂时只用openid1来作为测试用
        model.addInfo(req.body.openid,req.file.path);
       // console.log("插入数据库成功！ "+ req.file.path);
    }
    else(res.send('不存在此文件'))
});



//测试GET
router.get('/', function (req, res, next) {

  console.log("post get");
  
  res.send("post get");

  next();

  
});
/*
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
var upload = multer({ storage: storage });

router.post('/', function (req, res, next) {
  console.log("post test");

var files = req.files;
console.log(files);
if(files[0])
  console.log("files exist");
else
  console.log("files Not");


  res.send("post test");

  next();

});
*/
/*
router.post('/', upload.array('photo', 40), function(req, res, next) {
    var files = req.files
    console.log("test post !");
   // console.log(files);
    if (!files[0]) {
        res.send('error');
    } else {
        res.send('success');
    }



   // console.log(files);
   next();
});
*/





module.exports = router;
