var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken")
/* GET home page. */
var arr=[
  {
    "id":1,
    "name":"aaa"
  },
  {
    "id":2,
    "name":"bbb"
  },
  {
    "id":3,
    "name":"ccc"
  }
]
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get("/list",function(req,res,next){
  res.json({
    list:arr
  })
})

router.post("/reg",function(req,res,next){
  console.log(req.body)
  arr.push({
    id:arr.length+1,
    name:req.body.username
  });
  res.json({
    ret:true,
    data:true
  })
})
router.post("/login",function(req,res,next){
  console.log(req.body)
  let {username, password} = req.body
  if(username=="admin"&&password=="123"){
    console.log("aaa")
    jwt.sign({username, time:new Date().getTime()},"haha", {"expiresIn":5},(err,token)=>{
      res.json({
        data:true,
        "token":token
      })
    })
  }else{
    res.json({
      ret:true,
      data:false
    })
  }
})
router.get("/verify",(req,res,next)=>{
  jwt.verify(req.cookies.token,"haha",(err,token)=>{
    if(!err){
      res.json({
        ret:true,
        msg:"ok"
      })
    }else{
      res.json({
        ret:true,
        msg:"err"
      })
    }
  })
})

module.exports = router;
