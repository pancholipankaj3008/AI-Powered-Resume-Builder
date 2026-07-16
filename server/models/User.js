
let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:true, 
        trim:true
    },
    email:{
        type:String, 
        required:true, 
        unique:true, 
        lowercase:true, 
        trim:true
    },
    password:{
        type:String, 
        required:true
    },
    role:{
        type:String, 
        required:true,
        enum:["user"],
        default: "user"
    },
},{
    timestamps:true,
});

let User = mongoose.model("User", UserSchema);

module.exports=User;