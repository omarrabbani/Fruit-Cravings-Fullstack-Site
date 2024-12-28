import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}
},{minimize:false,collection: 'users'});

const userModel = mongoose.models.user || model("user",userSchema);
export default userModel;