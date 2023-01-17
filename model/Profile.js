const mongooes=require("mongoose")
const Schema=mongooes.Schema
const ProfileSchema=new Schema({
   
    type:{
        type:String
    },
    describe:{
        type:String
    },
    income:{
        type:String,
        require:true
    },
    expend:{
        type:String,
        require:true
    },
    cash:{
        type:String,
        require:true
    },
    remark:{
        type:String
    },
    date:{
        type:Date,
       default:Date.now
    },
})


module.exports=Profile=mongooes.model("profile",ProfileSchema)