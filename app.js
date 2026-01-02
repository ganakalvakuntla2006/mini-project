const express = require('express');
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");
const cookieParser = require('cookie-parser');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render("index");
});
app.get('/login',(req,res)=>{
    res.render("login");
})
// console.log(userModel);
app.post('/register', async(req, res) => {
    let {email,password,username,name,age}=req.body;
    console.log(req.body);
    let user= await userModel.findOne({email});
    if(user) return res.status(400).send("user already registered");
    

    bcrypt.genSalt(10,(err,salat)=>{
        bcrypt.hash(password,salat,async(err,hash)=>{
            let user = await userModel.create({
                username,
                email,
                age,
                name,
                password: hash
            })
            let token =jwt.sign({email:email,userid:user._id},"shhh")
            res.cookie("token",token);
            res.send("register")
        })
    })
});

app.post('/login', async(req, res) => {
    let {email,password,username,name,age}=req.body;
    console.log(req.body);
    let user= await userModel.findOne({email});
    if(user) return res.status(400).send("user already registered");
    

    bcrypt.genSalt(10,(err,salat)=>{
        bcrypt.hash(password,salat,async(err,hash)=>{
            let user = await userModel.create({
                username,
                email,
                age,
                name,
                password: hash
            })
            let token =jwt.sign({email:email,userid:user._id},"shhh")
            res.cookie("token",token);
            res.send("register")
        })
    })
});
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

