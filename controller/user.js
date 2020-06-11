const Controller = {}

const Service = require("../models/Service")
const User = require("../models/User")
const nodemailer = require("nodemailer");
var multiparty = require("multiparty")
var cloudinary = require("cloudinary")

cloudinary.config({
    cloud_name: "blues1905",
    api_key: "642721642791148",
    api_secret: "u-yjKxbeck9WFW7Z4QJeegx77Io"
})

Controller.signuplogin = function (req, res) {
    res.render("signuplogin", {
        alreadyexist: req.query.alreadyexist,
        invaliduser: req.query.invaliduser,
        wrongpassword: req.query.wrongpassword,
        updatedPassword: req.query.updatedPassword,
    })
}

var otpStore
var dataArray
Controller.usersignup = function (req, res) {

    var data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mobile: req.body.mobile,
        email: req.body.email,
        password: req.body.password

    }
    dataArray = data



    User.findOne({ email: req.body.email }, function (err, result) {
        if (result == null) {
            var otp = Math.floor(Math.random() * 1000000)
            otpStore = otp

            console.log(otpStore)
            main().catch(console.error);
            res.redirect("/otp")
        } else {
            res.redirect("/signuplogin?alreadyexist=true")
        }
    })


    // var otp = Math.floor(Math.random() * 1000000)
    // otpStore = otp

    // console.log(otpStore)

    // main().catch(console.error);


}
Controller.otp = function (req, res) {
    res.render("otp", {
        wrongotp: req.query.wrongotp
    })
}


Controller.userotp = function (req, res) {
    console.log("hello post")


    if (req.body.otp == otpStore) {

        User.create(dataArray, function (err, result) {
            if (err) {
                res.redirect("/signuplogin")
            } else {
                res.redirect("/signuplogin")
            }
        })


    } else {
        res.redirect("/otp?wrongotp=true")
    }

}

Controller.userlogin = function (req, res) {
    User.findOne({ email: req.body.email }, function (err, result) {
        if (result == null) {
            res.redirect("/signuplogin?invaliduser=true")
        } else {
            if (req.body.password == result.password) {
                req.session.user = { email: req.body.email }
                res.redirect("/?userlogin=true")
            } else {
                res.redirect("/signuplogin?wrongpassword=true")
            }
        }
    })
}

Controller.bookedService = function (req, res) {

    Service.findOne({ name: req.body.name }, function (err, service) {
        var arrRadio = req.body.optradio.split(";")
        var num = parseInt(arrRadio[0])
        var total = Math.round(num + (0.18 * num))

        arrRadio.push(total, service.name)

        var data = {
            price: arrRadio

        }


        if (req.session.user) {
            User.findOne({ email: req.session.user.email }, function (err, result) {
                return confirmation(arrRadio[4], arrRadio[1], arrRadio[2], arrRadio[0], total, req.session.user.email, result.firstname, result.lastname).catch(console.error);
            })
            User.updateOne({ email: req.session.user.email }, { $push: data }, function (err, insert) {

                if (err) {
                    console.log(err)
                } else {
                    res.redirect('/?userlogin=true')
                }
            })
        }
        else {
            res.redirect('/signuplogin')
        }
    })
}


Controller.middle = function (req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect("/")
    }
}

// Controller.cached = (req, res, next) => {
//     res.set(
//       "Cache-Control",
//       "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
//     );
//     next();
//   }

Controller.profile = function (req, res) {
    User.findOne({ email: req.session.user.email }, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            res.render("profile", {
                
                user: result,
                addressUpdated: req.query.addressUpdated,
                profileUpdated: req.query.profileUpdated
            })
        }
    })

}

Controller.updateAddress = function (req, res) {
    var addressData = {
        inputAddress: req.body.inputAddress,
        inputAddress2: req.body.inputAddress2,
        inputCity: req.body.inputCity,
        inputState: req.body.inputState,
        inputZip: req.body.inputZip

    }
    User.updateOne({ email: req.session.user.email }, { $push: addressData }, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            // res.redirect('/profile?addressUpdated=true')
            res.redirect('/profile?addressUpdated=true')
        }
    })
}

Controller.updateuserinfo = function (req, res) {
    User.findOne({ email: req.session.user.email }, function (err, user) {
        if (err) {
            console.log(err)
        }
        else {
            var form = new multiparty.Form({});
            form.parse(req, function (err, fields, files) {
                var updatedData = {}
                if (files.photo[0].size != 0) {
                    cloudinary.uploader.upload(files.photo[0].path, function (result) {
                        console.log(result.url)
                        updatedData.photo = result.url
                        if (fields.firstname[0].length != 0) {
                            updatedData.firstname = fields.firstname[0]
                        }
                        if (fields.lastname[0].length != 0) {
                            updatedData.lastname = fields.lastname[0]
                        }
                        if (fields.mobile[0].length != 0) {
                            updatedData.mobile = fields.mobile[0]
                        }
                        if (fields.cfNewPassword[0].length != 0) {
                            updatedData.password = fields.cfNewPassword[0]
                        }
                        User.updateOne({ email: req.session.user.email }, { $set: updatedData }, function (err, result) {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                res.redirect('/profile?profileUpdated=true')
                            }
                        })
                    })
                }
                else {
                    if (fields.firstname[0].length != 0) {
                        updatedData.firstname = fields.firstname[0]
                    }
                    if (fields.lastname[0].length != 0) {
                        updatedData.lastname = fields.lastname[0]
                    }
                    if (fields.mobile[0].length != 0) {
                        updatedData.mobile = fields.mobile[0]
                    }
                    if (fields.cfNewPassword[0].length != 0) {
                        updatedData.password = fields.cfNewPassword[0]
                    }
                    User.updateOne({ email: req.session.user.email }, { $set: updatedData }, function (err, result) {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            res.redirect('/profile?profileUpdated=true')
                        }
                    })
                }
            })
        }
    })
}



// Controller.updateuserinfo = function (req, res) {
//     var form = new multiparty.Form();
//     form.parse(req, function (err, fields, files) {
//         var updatedData = {} 
//         if (fields.cfNewPassword[0].length == 0) {
//              updatedData = {
//                 firstname: fields.firstname[0],
//                 lastname: fields.lastname[0],
//                 mobile: fields.mobile[0]
//             }
//             if (files.photo[0].size != 0) {
//                 // updatedData.photo = pic.path.replace("uploads\\", "")
//                 cloudinary.uploader.upload(files.photo[0].path, function (result) {
//                     updatedData.photo = result.url
//                     // console.log(result.url,"result") 

//                 })

//             }
//             console.log(updatedData.photo,"object")
//             User.updateOne({ email: req.session.user.email }, { $set: updatedData }, function (err, result) {
//                 if (err) {
//                     console.log(err)
//                 } else {
//                     res.redirect('/profile?profileUpdated=true')
//                 }
//             })




//             // else  {
//             //     // User.findOne({email:req.session.user.email},function (err,result) {
//             //     //     updatedData.photo = result.photo
//             //     // })
//             //     // User.updateOne({ email: req.session.user.email }, { $set: updatedData }, function (err, result) {
//             //     //     if (err) {
//             //     //         console.log(err)
//             //     //     } else {
//             //     //         res.redirect('/profile?updated=true')
//             //     //     }
//             //     // })
//             // }

//         } else {
//             var updatedData = {

//                 firstname: fields.firstname[0],
//                 lastname: fields.lastname[0],
//                 mobile: fields.mobile[0],
//                 password: fields.cfNewPassword[0]
//             }
//             if (files.photo[0].size != 0) {
//                 // updatedData.photo = pic.path.replace("uploads\\", "")
//                 cloudinary.uploader.upload(files.photo[0].path, function (result) {
//                     updatedData.photo = result.url
//                 })
//             }
//             User.updateOne({ email: req.session.user.email }, { $set: updatedData }, function (err, result) {
//                 if (err) {
//                     console.log(err)
//                 } else {
//                     req.session.destroy();
//                     res.redirect('/signuplogin?updatedPassword=true')
//                 }
//             })




//             // else {
//             //     User.updateOne({ email: req.session.user.email }, { $set: updatedData }, function (err, result) {
//             //         if (err) {
//             //             console.log(err)
//             //         } else {
//             //             req.session.destroy();
//             //             res.redirect('/signuplogin?updatedPassword=true')
//             //         }
//             //     })
//             // }




Controller.deleteBooking = function (req, res) {
    User.findOne({ email: req.session.user.email }, function (err, result) {
        var bookingArray = result.price.filter(function (a, i) {
            return i != req.body.index
        })
        User.updateOne({email:result.email},{$set:{"price":bookingArray}},function (err,result) { 
            if(err){
                console.log(err)
            }  
            else{
                res.redirect("back")
            }  
        })

    })
}
//         }
//     })
// }

// Controller.delete = function (req,res) {

//     // var data = {
//     //     cost : req.body.cost,
//     //     category : req.body.category,
//     //     product : req.body.product,
//     //     totalCost : req.body.totalCost,
//     //     serviceName : req.body.serviceName
//     // }
//     User.findOneAndUpdate({email:req.body.email},{$pull:{"price.$.0":{"cost" : req.body.cost
//     }}},function(err,result){
//         if(err){
//             console.log(err)
//         }
//         else{
//             res.redirect("/profile?updated=true")
//         }
//     })

// }

Controller.logout = function (req, res) {
    req.session.destroy();
    res.redirect("/?loggedout=true")
}



async function main() {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "officialfixitbuddy@gmail.com",
            pass: "kpuhfwbdhabnoszt"
        }
    });
    console.log(dataArray)

    let info = await transporter.sendMail({
        from: 'officialfixitbuddy@gmail.com',
        to: dataArray.email,
        subject: "Hello ✔",
        text: "Hello User. Welcome to Fix-it Buddy.",
        html: "<p>Congratulations <b>" + dataArray.firstname + " " + dataArray.lastname + "</b>. Your Fix-it Buddy account has been created successfully.</p><br><br>Your otp is: " + otpStore + "<h2>Welcome to Fix-it Buddy</h2>" // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}

async function confirmation(name, category, type, cost, sum, useremail, firstname, lastname) {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "officialfixitbuddy@gmail.com",
            pass: "kpuhfwbdhabnoszt"
        }
    });

    console.log(dataArray)
    let info = await transporter.sendMail({
        from: 'officialfixitbuddy@gmail.com',
        to: useremail,
        subject: "Booking Confirmed",
        text: "Your service has been successfully booked.",
        html: "<p>Hello <b>" + firstname + " " + lastname + "</b>,<br> Thank you for your booking! Your service will be completed within [48] hours.You Will soon recieve a call from our technician for the respective booking.<br><br><div><p>Your booking details are:</p><br><ul><li>Service detail:" + name + "(" + category + ":" + type + ")</li><li>Service cost:" + cost + "</li><li>GST:18%</li><li>VAT:5%</li><li>Total amount to be paid: " + sum + "</li></ul></div><br>Thank you for choosing Fix-it Buddy<br>best regards,<br>Fix-it Buddy"
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}


module.exports = {
    Controller: Controller
}