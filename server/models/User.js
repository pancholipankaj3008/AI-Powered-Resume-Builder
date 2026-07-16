
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
},{
    timestamps:true,
});

let User = mongoose.model("User", UserSchema);

module.exports=User;