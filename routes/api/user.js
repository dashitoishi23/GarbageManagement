const express = require('express');
const gravatar = require('gravatar');
const router = express.Router();
const User = require('../../models/user');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport=require('passport');

const app = express();


router.post('/register',(req,res)=>{


    res.setHeader('Access-Control-Allow-Origin', "*");

    User.findOne({email:req.body.email})
    .then(user=>{
        if(user){
            return res.status(404).json({err:"email is already exists"});
        }else{
            const avatar=gravatar.url(req.body.email,
                {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                   });
                   const newUser=new User({
                    name:req.body.name,
                    email:req.body.email,
                    avatar:avatar,
                    password:req.body.password
                });
                bcrypt.genSalt(10, (err, salt)=> {
                    bcrypt.hash(req.body.password, salt,(err, hash)=> {
                        if(err) throw err;
                        newUser.password=hash;
                        newUser.save()
                        .then(user=>res.json(user))
                        .catch(err=>console.log(err));
                    });
                });
        }
    })
 
});

router.post('/login',(req,res)=>{
 

    const email=req.body.email;
    const password=req.body.password;
    User.findOne({email})
    .then(user=>{
        if(!user){
            return res.status(404).json({email:"email not exists"});
        }
        bcrypt.compare(password,user.password)
        .then(isMatch=>{
            if(isMatch){
                
                // res.json({msg:"success"});
                const payload={id:user.id,name:user.name,avatar:user.avatar};
                jwt.sign(payload,keys.secretOrKey,{expiresIn:60*60*3},
                    (err,token)=>{
                        res.json({
                            success:true,
                            token:'bearer '+token
                        })
                })
            }
            else{
                error.password = 'Password incorrect';
               return res.status(400).json(error);
            }
            
        })
    })
    .catch(err=>console.log(err));
});

router.get("/", passport.authenticate('jwt', { session: false }),(req, res)=>{
    User.find()
    .then(user=>{
        if(user){
            res.json(user);
        }else{
            return res.status(404).json({err:"no user found"});
        }
    })
    
  });

module.exports = router;