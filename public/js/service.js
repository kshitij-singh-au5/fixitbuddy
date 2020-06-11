$(document).ready(function() {
    $('#tableSelect tr').click(function() {
        $(this).find('td input:radio').prop('checked', true);
    })


    $("#feature1").click(function() {
        $("#panel1").slideToggle();
    });

    $("#feature2").click(function() {
        $("#panel2").slideToggle();
    });
    $("#feature3").click(function() {
        $("#panel3").slideToggle();
    });
    $("#feature4").click(function() {
        $("#panel4").slideToggle();
    });

    $("#button-bathroom-cleaning").click(function () {
        $("#bookNowModal").modal("show")

    })

    $("#button-carpet-cleaning").click(function () {
        $("#bookNowModal").modal("show")

    })

    $("#button-full-home-cleaning").click(function () {
        $("#bookNowModal").modal("show")

    })

    $("#button-kitchen-cleaning").click(function () {
        $("#bookNowModal").modal("show")

    })

    $("#button-electricians").click(function () {
        $("#bookNowModal").modal("show")

    })

    $("#button-plumbers").click(function () {
        $("#bookNowModal").modal("show")

    })

    $("#button-carpenters").click(function () {
        $("#bookNowModal").modal("show")

    })

    $("#button-ac-service").click(function () {
        $("#bookNowModal").modal("show")

    })

    $("#button-washing-machine").click(function () {
        $("#bookNowModal").modal("show")

    })

    $("#button-fridge").click(function () {
        $("#bookNowModal").modal("show")

    })

    $("#button-geyser").click(function () {
        $("#bookNowModal").modal("show")

    })

    $("#button-fitness").click(function () {
        $("#bookNowModal").modal("show")

    })

    $("#button-yoga").click(function () {
        $("#bookNowModal").modal("show")

    })

    // $("#tbodyp tr td:nth-last-child()").hide();

    // $('#priceTable thead tr th:last').hide(); 
    // $('#priceTable tbody tr').each(function() {
    //     $(this).hide('td:last'); 
    // });

    $('#priceTable tr').find('th:last, td:last').hide();

    $("#tableSelect tr").click(function () {
        $("#abutton").attr("href","#myModal")
        $("#bookServiceButton").removeAttr("disabled")
    })

    // $("#bookServiceButton").click(function () {
    //     $("#myModal").show()

    // })

    $("#modalBtn").click(function () {
        $("#target").submit();
    })
});