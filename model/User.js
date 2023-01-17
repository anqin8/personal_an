const mongooes=require("mongoose")
const Schema=mongooes.Schema
const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    identity:{
        type:String,
        require:true
    },
    date:{
        type:Date,
       default:Date.now
    },
})
// 在Schema中创建user模型用于进行数据库操作
// mongooes.model("user",UserSchema)

module.exports=User=mongooes.model("user",UserSchema)