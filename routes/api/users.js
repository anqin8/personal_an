const express = require("express")
const User = require("../../model/User")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const gravatar = require("gravatar")
const passport = require("passport")

// $route  GET api/users/test
// @desc   返回请求的json数据
// @access public
router.get("/test", (req, res) => {
    res.json({ msg: "login works" })
})

// $route  POST api/users/register
// @desc   返回请求的json数据
// @access public
router.post("/register", (req, res) => {
    // console.log(req.body)
    // 查询数据库中是否拥有邮箱
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                return res.status(400).json("邮箱已被注册！")
            } else {
                // 头像
                const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' })
                // 往数据库中创建新的一条数据
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,
                    identity: req.body.identity
                })
                // 密码加密（可用可不用）
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err
                        newUser.password = hash
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })
            }

        })
})

// $route  POST api/users/login
// @desc   返回token jwt passport
// @access public
router.post("/login", (req, res) => {
    const email = req.body.email
    const password = req.body.password
    // 查询数据库
    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json("用户不存在!")
        }
        // 加密后，密码匹配
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const rule = {
                    id: user.id,
                    name: user.name,
                    identity: user.identity
                }
                jwt.sign(rule, "secret", { expiresIn: 3600 }, (err, token) => {
                    if (err) throw err
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    })
                })
            } else {
                return res.status(400).json("密码错误！")
            }
        })
    })
})

// $route  GET api/users/current
// @desc   返回当前的用户
// @access private
router.get("/current", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity: req.user.identity
    })
})
module.exports = router;