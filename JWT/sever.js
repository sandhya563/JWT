require('dotenv').config()
const express = require("express");
const app = express();
const port = 4000;
const jwt = require("jsonwebtoken");
app.use(express.json());

const posts= [
    {
    username:"sandhya",
    title: "post1",
    },{
    username:"shakya",
    title: "post2"
    }
]

app.get("/api",authenticateToken,(req,res)=>{
    res.json(posts.filter(post => post.username === req.user.name))
})

// // for jwt token post api

app.post("/login",(req,res)=>{
    const username = req.body.username
    const user = {name: username}
    const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken: accessToken})
})

function authenticateToken(req,res,next){
    const authHeaders = req.headers['authorization']
    const token = authHeaders && authHeaders.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.listen(port,()=>{
    console.log(`server is runig on port ${port}`)
})