const addAdmin ={}
var Admin = require("../models/addAdmin.js");

addAdmin.create_admin = function(req,res){
    const admin = new Admin({
         email:req.body.email,
         password:req.body.password
    })
    req.session.admin = admin
    Admin.insertMany(admin,function(err,result){

        if(err) throw err;

        console.log(result)
        res.redirect('/read_admin')

    })
}

addAdmin.create = function(req,res){
    res.render("Admin",{
       
        
    })
}

addAdmin.read_admin = function(req,res){
   
    
    Admin.find(function(err,admin){
        
            if(!req.session.admin){
                
                res.redirect("create?invaidDetails")
               
            }
            else{
            if(req.session.admin.email=="fixitbuddy@gmail.com" && req.session.admin.password=="fixit"){
                console.log("logged in successfully!!!")
                res.render("dashboard",{
                
                })
             
        }
       
        else{
            res.redirect("/create?invalidDetails=True")
        }
    } 
        })

    }
    
        

//-----------Update for admin---------------------//
addAdmin.update_admin = function(req,res){
    var data = {
        email:req.body.email,
        newPassword : req.body.newPassword,
        confirmPassword : req.body.confirmPassword
    }
   
    Admin.updateOne({email: req.session.admin.email}, {$set: data}, function(err,admin){
        if(err){
            console.log(err)
        }
        else{
            res.redirect("/adminprofile")
        }
    })
   
}

//---------------DELETE for admin--------------------//
addAdmin.delete_admin = function(req,res){
      
    var postsIDs = req.params._id
    Admin.deleteMany({ _id: { $in:postsIDs }},(err, doc) => {

        if (!err) {

            res.redirect('/read_admin');

        }

        

    });


}

addAdmin.adminprofile=function(req,res){
    if(req.session.admin){
        res.render("adminprofile",{
            loggedInadmin:req.session.admin,
            
            
        })
    }
    else{
        res.redirect("/create")
    }
}
addAdmin.logout = function (req, res) {
    req.session.destroy();
    res.redirect("/create")
    console.log("logged out successfully!!!")
}



module.exports = {
    addAdmin:addAdmin
};


