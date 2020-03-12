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
    users.find()
        .then((usersdb)=>{
            res.status(200).json(usersdb)
        })
        .catch(err=> res.status(500).json({message: "Internal Error"}))
    
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
    users.remove(id)
        .then((usr)=>{
            console.log(usr)
            console.log(users.find())
            if(usr){
                res.status(201).json({
                    message: `User id ${id} deleted`, user: usr
                })
            } else {
                res.status(404).json({message: "User not found"})
            }
            
        })
        .catch((err)=> res.status(500).json({message: "Internal error removing user"}))
    
})

server.get("/api/users/:id", (req,res) => {
    const {id} = req.params;
    console.log(id)

    users.findId(id)
        .then((usr) => {
            if(usr){
                res.status(200).json(usr)
            } else {
                res.status(404).json({message: "The user with the specfied ID does not exist."})
            }
        })
        .catch(err => res.status(500).json({errorMessage: "The user information could not be retrieved."}))
})


server.put("/api/users/:id", (req,res) =>{
    const {id} = req.params;

    const changes = req.body;
    
    if("name" in changes && "bio" in changes) {
        users.updateId(id, changes)
        .then(usr => {
            if(usr){
                res.status(200).json(usr)
            } else {
                res.status(404).json({message: "The user with the specified ID does not exist."})
            }
        })
        .catch(err => res.status(500).json({errorMessage: "The user information could not be modified."}))
    } else {
        res.status(400).json({errorMessage: "Please provide name and bio for the user." })
    }

    
})