const express = require("express")
const path = require("path")
const Redis = require("ioredis");
const redis = new Redis(6379,"127.0.0.1");
const app = express()
const port = 3000

app.get("/html",(req,res)=>{
    res.sendFile(path.join(__dirname)+"/public/homepage.html")
})

app.get("/",(req,res)=>{
    res.send("Hello,World")
})

app.get("/team",(req,res)=>{
    const team = req.query.team;
    redis.hgetall(team)
    .then((data)=>{
        res.json(data)
    });
})

app.get("/globalrankings",async(req,res)=>{
    var response = {}
    var results = [];
    response.status = "OK"
    const top = req.query.top;
    let teams = await redis.zrange("sortedBySPI",0,top-1);
    for(entry of teams)
    {
        let obj = await redis.hgetall(entry)
        results.push(obj)
    }
    response.status = "OK"
    response.results = results
    res.json(response)
})

app.post("/",(res,req)=>{
    res.send("Got a PUT request")
})


app.listen(port,()=>{
    console.log(`Example app listening at port ${port}`)
})

