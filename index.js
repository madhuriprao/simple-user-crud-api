import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/myfirstdb");

const userSchema = new mongoose.Schema ({
name : String,
age : Number,
email : String
});

const User  = mongoose.model("user", userSchema);

app.get('/users' , async(req, res)=> {
    const users  = await User.find();
    res.json(users);
});

app.post("/users", async (req, res)=>{
    const newuser = new User (req.body);
    await newuser.save();
    res.json(newuser);
});

app.put("/users/:id",async( req, res) => {
    const {id} = req.params;
    const updatedData = req.body;

    const updatedUser = await User.findByIdAndUpdate( id, updatedData, { 
        new : true
    });
    if (!updatedUser) {
        return res.status(404).json({error : "item not found"});
    }
    res.json(updatedUser);
})

app.delete("/users/:id",async(req, res) => {
    const {id} = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if(!deletedUser) {
        return res.status(404).json({error : "User not found"})
    }
    res.json({message: "User deleted", item : deletedUser})
})

app.listen(3000, () => console.log("server is runnuing at http://localhost:3000")
);

