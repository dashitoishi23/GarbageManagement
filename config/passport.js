const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;
// const mongoose=require('mongoose');
const User =require('../models/user');
const keys=require('./keys');

const opts={};
opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();

opts.secretOrKey=keys.secretOrKey;


module.exports=passport=>{
    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
         User.findById(jwt_payload.id)
        .then(user=>{
            if(user){
                return done(null,user);
            }
            else{
                return done(null,false);
            }
        }).catch(err=>console.log(err)); 
        
 

    }));
   
}
// module.exports=passports=>{
//     passports.use(new Jwt1Strategy(opts,(jwt_payload,done)=>{
//         Faculty.findById(jwt_payload.id)
//         .then(faculty=>{
//             if(faculty){
//                 return done(null,faculty);
//             }
//             else{
//                 return done(null,false);
//             }
//         }).catch(err=>console.log(err)); 
//    }));
// }