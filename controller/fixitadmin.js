const Controller = {}
const Admin = require("../models/Admin")
const Service = require("../models/Service")
const User = require("../models/User")


Controller.adminpanel = function (req,res) {
    res.render("Admin")
}

Controller.adminlogin = function (req,res) {
    console.log(req.body)
    Admin.findOne({username: req.body.username},function (err,result) {
        console.log(result)
        if(req.body.password == result.password){
            req.session.admin = {username:req.body.username}
            res.redirect("/admin")
        }
        else{
            res.redirect("/adminpanel")
        }
    })
}

Controller.adminmiddle = function (req, res, next) {
    if (req.session.admin) {
        next();
    } else {
        res.redirect("/")
    }
}

Controller.admin = function(req,res){
    Admin.findOne({username:req.session.admin.username},function (err,result) {
        User.find({},function (err,results) {
            res.render("adminn",{
                user: results,
                admin: result
                
        })
      })
    })
}

Controller.adminlogout = function (req, res) {
    req.session.destroy();
    res.redirect("/?adminloggedout=true")
}


module.exports = {
    Controller : Controller
}