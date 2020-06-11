$(document).ready(function() {

    $("#infoUpdateBox").hide()
    $("#addressUpdateBox").hide()
    $("#myBookingBox").hide()

    $("#infoUpdate").click(function() {
        $("#myBookingBox").hide()
        $("#infoUpdateBox").show()
        $("#addressUpdateBox").hide()
        $("#infoBox").hide()
    });

    $("#addressUpdate").click(function() {
        $("#myBookingBox").hide()
        $("#infoUpdateBox").hide()
        $("#addressUpdateBox").show()
        $("#infoBox").hide()
    });

    $("#userInfo").click(function() {
        $("#myBookingBox").hide()
        $("#infoUpdateBox").hide()
        $("#addressUpdateBox").hide()
        $("#infoBox").show()

    });

    $("#myBooking").click(function() {
        $("#myBookingBox").show()
        $("#infoUpdateBox").hide()
        $("#addressUpdateBox").hide()
        $("#infoBox").hide()
    });


    $("#cfNewPassword").on("keyup", function() {

        var pwd = $("#newPassword").val()
        var cfpwd = $("#cfNewPassword").val()
        console.log(cfpwd)
        console.log(pwd)
        if (cfpwd == pwd) {
            console.log("hello")

            $("#profileButton").removeAttr("disabled").css('opacity', 1);
        } else {
            $("#profileButton").attr("disabled", true).css('opacity', 0.5);
        }
    })

    $('#toast').toast('show');

    $("#modalBtn").click(function () {
        $("#target").submit();
    })

});