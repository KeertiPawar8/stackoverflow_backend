const {UserModel} = require("../models/user.model")
const mongoose = require("mongoose")
const express = require("express")
const userRouter = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {BlackModel} = require("../models/black.model")


userRouter.post("/signup",async(req,res)=>{

const {name,email,pass} = req.body;
console.log(name,email,pass)
const checkuser = await UserModel.find({email})

if(checkuser.length>0){
    res.send({msg:"user already exist please login"})
}
else{

    try{
          
          bcrypt.hash(pass,5,async(err,hash)=>{

                 const user = new UserModel({name,email,pass:hash})
                 await user.save()
                 res.send({msg:"user has been registered"})

          })

    }
    catch(err){
        res.send(err)
    }
}

})

userRouter.post("/login",async(req,res)=>{

    const {email,pass} = req.body;

    const user = await UserModel.find({email})

    if(user.length==0){
        res.send({msg: "user does not exist please signup"})
    }


    else{
              
        bcrypt.compare(pass,user[0].pass,(err,result)=>{
                 
            if(result){

              
                const token = jwt.sign({userID:user[0]._id, name: user[0].name},process.env.JWT_SECRET)
             
                res.send({token})


            }
            else{
                res.send({msg:"wrong credentials"})
            }


        })



    }

})



userRouter.get("/logout",async(req,res)=>{

let token = req.headers.authorization.split(" ")[1]

let black = new BlackModel({token})

await black.save();
res.send({msg:"logout successfull"})


})

module.exports = {
    userRouter
};
