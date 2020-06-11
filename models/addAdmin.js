const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
    
    email:{
        type:String, required: true,
        
    },

    password:{
        type:String, required: true,
        
        
    },
   

})

// Custom validation for email
adminSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

var Admin=mongoose.model('Admin', adminSchema);
module.exports = Admin;