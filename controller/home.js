const Controller = {}
const Service = require("../models/Service")
const User = require("../models/User")

Controller.home = function (req, res) {
    Service.find({},function (err, result) {
        var cleaning = result.filter(function (elem) {
            return elem.service == "cleaning"
        })
        var electricianPlumbing = result.filter(function (elem) {
            return elem.service == "electrician-plumbing"
        })
        var appliancesRepair = result.filter(function (elem) {
            return elem.service == "appliances-repair"
        })
        var fitnessYoga = result.filter(function (elem) {
            return elem.service == "fitness-yoga"
        })
        if (req.session.user) {
            User.findOne({ email: req.session.user.email }, function (err, results) {
                if (err) {
                    console.log(err)
                } else {
                    res.render("home", {
                        cleaning: cleaning,
                        electricianPlumbing: electricianPlumbing,
                        appliancesRepair: appliancesRepair,
                        fitnessYoga: fitnessYoga,
                        userlogin: req.query.userlogin,
                        
                        user: results
                    })
                }
            })
        } else {
            res.render("home", {
                cleaning: cleaning,
                electricianPlumbing: electricianPlumbing,
                appliancesRepair: appliancesRepair,
                fitnessYoga: fitnessYoga,
                userlogin: req.query.userlogin
            })
        }
    })
}

Controller.aboutus = function (req,res) {
    if (req.session.user) {
        User.findOne({ email: req.session.user.email }, function (err, results) {
            if (err) {
                console.log(err)
            } else {
                res.render("aboutus", {
                    
                    userlogin: req.query.userlogin,
                    
                    user: results
                })
            }
        })
    } else {
        res.render("aboutus", {
            
            userlogin: req.query.userlogin
        })
    }
}

module.exports = {
    Controller : Controller
}