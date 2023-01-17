const mongooes=require("mongoose")
const Schema=mongooes.Schema
const ImgSchema=new Schema({
    mimetype:{
        type:String,
        require:true
    },
    url:{
        type:String,
        require:true
    }
})

module.exports=Img=mongooes.model("img",ImgSchema)