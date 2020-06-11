const Employee ={}
var addemployee = require("../models/addemployee.js");

//---------------POST for add employee-----------//

Employee.create_details = function(req,res){
    
    res.render("addemployee",{
         title: "Insert employee",
       });
       
    

}

Employee.create = function(req,res){
    if (req.body._id == '')

        insertRecord(req, res);

        else

        updateRecord(req, res);

};
function insertRecord(req, res) {

    const addemployees =new addemployee({
                   id : req.body.id,
                   firstname:req.body.firstname,
                   lastname:req.body.lastname,
                   department:req.body.department,
                   title:req.body.title,
                   mobile:req.body.mobile,
                   email:req.body.email,
                   address:req.body.address,
                   state:req.body.state,
                   experience:req.body.experience,
                   Hdate:req.body.Hdate,
                   Bdate:req.body.Bdate
    })
    
    
addemployees.save((err, doc) => {
if (!err)

            res.redirect('/read-employee');

        else {

            if (err.name == 'ValidationError') {

                handleValidationError(err, req.body);

                res.render("addemployee", {

                    viewTitle: "Insert Employee",

                    employee: req.body

                });

            }

            else

                console.log('Error during record insertion : ' + err);

        }

    });

}



//----------------GET for employee-------------//


Employee.read_employee = function(req,res){
    addemployee.find(function(err, employees) {
        if (err)
            res.send(err)
        res.render("employee",{
             
            blogs:employees,
            
        });
    });
}
 

function handleValidationError(err, body) {

    for (field in err.errors) {

        switch (err.errors[field].path) {

            case 'firstnameame':

                body['fullNameError'] = err.errors[field].message;

                break;

            case 'email':

                body['emailError'] = err.errors[field].message;

                break;

            default:

                break;

        }

    }

}







//----------------UPDATE for employee------------//
function updateRecord(req, res) {

    addemployee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {

    if (!err) { res.redirect('/read-employee'); }

        else {

            if (err.name == 'ValidationError') {

                handleValidationError(err, req.body);

                res.render("addemployee", {

                    viewTitle: 'Update Employee',

                    employee: req.body

                });

            }

            else

                console.log('Error during record update : ' + err);

        }

    });

}



Employee.create_employee = function(req,res){
    
    
       id = req.params._id;
        addemployee.findById(req.params._id, function(err,employees){
            if(err)
                throw err;
               res.render("addemployee",{
                   title:"update employee",
                   blogs:employees
               })
           
        });
    
    
       }
       


//--------------DELETE for employee---------//


Employee.delete_employee = function(req,res){
      
        var postsIDs = req.params._id
        addemployee.deleteMany({ _id: { $in:postsIDs }},(err, doc) => {
    
            if (!err) {
    
                res.redirect('/read-employee');
    
            }
    
            else { console.log('Error in employee delete :' + err); }
    
        });
    
   
}


  
module.exports = {
    Employee:Employee
};