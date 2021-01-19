const express = require("express")
const path = require("path")
const app = express()
const port = 3000

app.get("/",(req,res)=>{
    res.send("Hello,World")
})

app.get("/documentation",(req,res)=>{
    res.sendFile(path.join(__dirname,"./static/template.html"))
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})
