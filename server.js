const express = require("express");
const idshort = require("short-id");
const users = require("./users")

idshort.configure({
    length: 6,
})

const port = 4000;

const server = express();




const findId = (id) =>{

}

server.use(express.json());

server.listen(port, ()=>{
    console.log(`listning to port #${port}`)
})


server.get("/", (req,res)=>{
    res.send("Welcome to adrianbparra's server")
})



server.get("/api/users", (req,res)=>{
    res.send(users)
})


server.post("/api/users", (req,res)=>{
    
    const userInfo = req.body;
    console.log(userInfo)

    userInfo.id = idshort.generate();

    if("name" in userInfo && "bio" in userInfo){
        users.userAdd(userInfo)
            .then((user)=>{
                res.status(201).json({message:"User Added", user })
            })
            .catch((err)=>{
                res.status(500).json({message: "There was an error while saving", err})
            })
        
       
    } else {
        res.status(400).json({errorMessage: "Please include name and bio"})
    }
    // res.status(201).json({success: true, userInfo})
})


server.delete("/api/users/:id", (req,res)=>{
    const {id} = req.params
    console.log(id)

    res.status(201).json({
        message: `User id ${id} deleted`, users: users.find
    })
})