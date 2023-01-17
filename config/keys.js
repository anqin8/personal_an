// 连接数据库
const mongooes=require("mongoose")
mongooes.connect("mongodb://127.0.0.1:27017/node-app")
mongooes.connection.on("connected",function(){
    console.log("连接成功")
})
mongooes.connection.on("error",function(err){
    console.log("连接失败",err)
})
mongooes.connection.on("disconnection",function(){
    console.log("断开连接")
})
