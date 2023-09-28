const User = require("../model/userSchema.models");
const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

Router.post("/register", async(req,res)=>{
    try {
        const {user, email, password, role} = req.body;

    const isPresent = await User.findOne({email});
    if(isPresent){
        return res.send("user already registered");
    }

    const createUser = await User.create({user, email, password,role});
    return res.send(createUser)
    } catch (error) {
         res.send({error:error.messsage});
    }
})

Router.post("/login", async(req, res)=>{
    try {
        const {email, password} = req.body;
        const isPresent = await User.findOne({email});

        if(!isPresent){
            res.send("user not registered");
        }

        if(password != isPresent.password){
             res.send("invalid password");
        }

        const compare = bcrypt.compareSync(req.body.password, isPresent.password);

        const payload = {userId:isPresent._id, role:isPresent.role};
        const token = jwt.sign(payload, "catherine", {expiresIn:"2h"})

         res.send({messsage:"logged in successfully!!", token:token});

    } catch (error) {
        res.send({error:error.messsage});
    }
})

module.exports = Router;