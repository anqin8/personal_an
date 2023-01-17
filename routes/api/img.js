const express=require("express")
const Img=require("../../model/Img")
const router=express.Router()

// $route  Post api/Img/add
// @desc   增加图片（路径）
// @access public
router.post("/add",(req,res)=>{
    const imgMsg={};
    if(req.body.url) imgMsg.url=req.body.url
    if(req.body.mimetype) imgMsg.mimetype=req.body.mimetype
    new Img(imgMsg).save().then(img=>{
        res.json(img)
    })    
})

// $route  Get api/Img
// @desc   查询所有图片展示
// @access public
router.get("/",(req,res)=>{
    Img.find().then(img=>{
        if(!img){
            return res.status(404).json("库里空空~~~")
        }
        res.json(img)
    }).catch(err=>res.status(404).json(err))
})

module.exports=router