const Controller = {}
const Service = require("../models/Service")
const User = require("../models/User")


Controller.service = function (req, res) {
    Service.findById(req.query.id, function (err, result) {
        if (req.session.user) {
            User.findOne({ email: req.session.user.email }, function (err, results) {
                if (err) {
                    console.log(err)
                } else {
                    res.render("service", {
                        service: result,
                        userlogin: req.query.userlogin,
                        user: results
                    })
                }
            })
        } else {
            res.render("service", {
                service: result
            })
        }

    })
}


module.exports = {
    Controller : Controller
}