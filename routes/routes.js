var express = require('express');
var router = express.Router();
var launchParams = require('../launchParams')

var claims = require('../claims');
const jwt = require('jsonwebtoken');
var request = require('request');
const fs = require('fs');


router.get('/', function(req, res, next) {
res.render('index', { title: 'Platform', launchParams : launchParams});
  });


router.post('/login_initiations', (req, res)=>{
  params = req.body;
res.render('initiator', {Params :params})
})  

  

router.get('/authorizations/new', (req, res, next)=>{
  if(params.client_id == req.query.client_id 
    && params.login_hint == req.query.login_hint
    && params.lti_message_hint ==  req.query.lti_message_hint
    && params.target_link_uri == req.query.redirect_uri)
    {   var state = req.query.state
       claims.nonce = req.query.nonce;
        privateKey = fs.readFileSync('Keys/privateKey.pem', 'utf-8')
        var token =  jwt.sign(claims, privateKey , { algorithm: 'RS256', expiresIn: '2d', keyid : "ts8Wx-Vn2l89ncd516KwklZAYPXgcpoZDEJGXqJrBLc" });
        res.render('toolLaunch',{id_token : token , state : state , action : req.query.redirect_uri});
      }
})



  module.exports = router;