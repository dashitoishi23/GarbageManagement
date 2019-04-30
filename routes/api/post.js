const express=require('express');
const router=express.Router();
const keys = require('../../config/keys');
const mongoose = require('mongoose');
const helmet=require('helmet');
const path = require('path');
const fs = require('fs');
const Post=require('../../models/post');
const passport=require('passport');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

const publicPath = path.join(__dirname);


const app=express();
app.use(helmet());
app.use('/', express.static(publicPath));




router.post('/',(req,res)=>{
const newPost={
    text:req.body.text,
    name:req.body.name,
    state:req.body.state,
    city:req.body.city
}
new Post(newPost).save().then(post=>res.json(post));
});

router.get('/',(req,res)=>{
    Post.find()
    .then(post=>{
        if(post){
            //res.setHeader('content-type', post.imgMime);
            res.json(post)
         
        }else{
            return res.status(404).json({err:"no post found"})
        }
    })
})

router.post('/search',(req,res)=>{
    Post.findOne({city:req.body.city})
    .then(post=>{
        if(post){
            res.json(post);
        }else{
            return res.status(404).json({err:"no post found"})
        }
    })
    .catch(err=>console.log(err))
    });

module.exports=router;