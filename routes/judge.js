var express = require('express');
const Sequelize = require('sequelize');
//const config = require('../model/config');
var model = require('../model/model');
var router = express.Router();

router.get('/', function(req,res,next){
	console.log("GET JUDGE");
	var param = req;

	model.getInfo(param,res,null);
	//res.render('test_1',{route:"photo_3449c9e5e332f1dbb81505cd739fbf3f.jpg"});
	//next();
});

router.post('/', function(req,res,next){
	console.log(req.body.openid);

	//其实只要点审核通过就行
	var param = req;
	//model.getInfo(param,res,req.body.openid);
	model.updateUser(req.body.openid,'yes',res);
	//res.sendStatus(200);
	//res.send('success');
	
	//res.redirect('/judge');
	res.send('200');
	//model.getInfo(param,res,req.body.openid);
	next();
	});

module.exports = router;
