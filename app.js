var express = require("express")
var hbs = require("hbs")
var bodyParser = require("body-parser")
var multiparty = require("multiparty")
const mongodb = require("mongodb")
var session = require("express-session")
var cloudinary = require("cloudinary")
const nodemailer = require("nodemailer");
const mongoose = require("mongoose")
const PORT = process.env.PORT || 4000
const HOST = "0.0.0.0"
//bsbjns,jnsn
var app = express()

app.use(express.static("public"))
app.use(express.static("uploads"))

app.set("view engine", "hbs")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
    secret: "qwerty",
    cookie: {
        maxAge: 1000 * 100 * 60,
        httpOnly: true,
        path: "/"
    }

}))

var url = "mongodb+srv://kshitij7:12345@cluster0-6awrx.mongodb.net/fixitbuddy?retryWrites=true&w=majority"
var DB = ""

mongoose.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );

// mongodb.MongoClient.connect(url, function (err, client) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log("Atlas Connected")
//         DB = client.db("fixitbuddy");
//     }
// })

// cloudinary.config({
//     cloud_name: "blues1905",
//     api_key: "642721642791148",
//     api_secret: "u-yjKxbeck9WFW7Z4QJeegx77Io"
// })

// var email = []
// console.log(email)


const service = require("./controller/service.js")

const home = require("./controller/home.js")

const user = require("./controller/user.js")

const admin = require("./controller/fixitadmin.js")

/////////////////////////////Admin Routes///////////////////////////
// app.use(user.Controller.middle)

app.get("/adminpanel",admin.Controller.adminpanel)

app.post("/adminlogin",admin.Controller.adminlogin)

app.use("/admin", admin.Controller.adminmiddle)

app.use("/admin", (req, res, next) => {
    res.set(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next();
  })

app.get("/admin", admin.Controller.admin)

app.use("/adminlogout", admin.Controller.adminmiddle)

app.get("/adminlogout", admin.Controller.adminlogout)

    





///////////////User Routes ////////////////////
app.get("/", home.Controller.home)

app.get("/aboutus", home.Controller.aboutus);

app.get("/service", service.Controller.service)

app.get("/signuplogin", user.Controller.signuplogin )


app.post("/usersignup", user.Controller.usersignup)

app.get("/otp", user.Controller.otp)

app.post("/userotp", user.Controller.userotp)

app.post("/userlogin", user.Controller.userlogin)

app.post("/bookedService", user.Controller.bookedService)

app.use(user.Controller.middle)

// It'll prevent to use home route by back button when user logout
app.use( (req, res, next) => {
    res.set(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next();
  })

app.get("/profile", user.Controller.profile)

app.post("/updateAddress", user.Controller.updateAddress)

app.post("/updateuserinfo", user.Controller.updateuserinfo)

app.post("/deleteBooking", user.Controller.deleteBooking)

app.get("/logout", user.Controller.logout)


app.get('/dashboard',function(req,res){
    res.render('dashboard')
});
    
app.get('/employee',function(req,res){
    res.render('employee')
});
    
app.get('/orderapproval',function(req,res){
    res.render('orderapproval')
});
    
app.get('/information',function(req,res){
    res.render('information')
});



app.listen(PORT ,HOST , function(){
    console.log("started:", PORT)
});