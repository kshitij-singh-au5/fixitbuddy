const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});


$(document).ready(function () {
    console.log("this")
    $('#toast').toast('show');
    // $("#otpG").hide()
    var firstname = $("#firstname").val()
    var lastname = $("#lastname").val()
    var email = $("#email").val()
    var mobile = $("#mobile").val()
    var pwd = $("#password").val()
    var cfpwd = $("#cfpassword").val()
    $("#submitButton").css('opacity', 0.5);
    $("#cfpassword").on("keyup", function () {
        firstname = $("#firstname").val()
        lastname = $("#lastname").val()
        email = $("#email").val()
        mobile = $("#mobile").val()
        pwd = $("#password").val()
        cfpwd = $("#cfpassword").val()
        console.log(cfpwd)
        console.log(pwd)
        if (cfpwd == pwd) {
            console.log("hello")

            $("#submitButton").removeAttr("disabled").css('opacity', 1);
        } else {
            $("#submitButton").attr("disabled", true).css('opacity', 0.5);
        }
    })
    
        // $("#submitButton").click(function () {
        //     if (firstname.length > 0 && lastname.length > 0 && email.length > 0 && mobile.length > 0 && mobile.length == 10 && pwd.length>=8 && cfpwd.length>=8){
        //     $("signupHide").hide()
        //     $("#otpG").show()
        //     }
        // })
    
    
       



});