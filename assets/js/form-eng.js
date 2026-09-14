$(document).ready(function(){
    $("#contact-form").validate({
        rules: {
            "name": {
                required: true,
                minlength: 3
            },
            "email": {
                required: true,
                email: true
            },
        },
        messages: {
            "name": {
                required: "This field is required.",
                minlength: "Name must be at least 3 characters long."
            },
            "email": {
                required: "This field is required.",
                email: "Please enter a valid email address."
            },
        },
        errorElement: "p",
        errorPlacement: function(error, element) {
            error.appendTo(element.closest(".field"));
        },
        submitHandler: function() {
            $.ajax({
                url: "https://script.google.com/macros/s/AKfycbzMolKN5jZQ9dQx8pGcr9zJypew6zGqFFF_FWSDnRIzCY2SHPYM9q4T_BsuUHc_Xz6abA/exec",
                type: "POST",
                data: $("#contact-form").serializeArray(),
                dataType: "json",
                beforeSend: function() {
                    $("#contact-form").css({
                        "opacity": "0.5",
                        "pointer-events": "none"
                    });
                    $("#contact-form").find(":input").prop("disabled", true);
                },
                success: function(response) {
                    
                            window.location.href = "./thankyou.html";
                    try {
                        console.log(response);
                        if ( response.is_success ) {
                            // redirect to thank you page
                            window.location.href = "./thankyou.html";
                            console.log("Message has been sent");
                        } else {
                            console.log("Message could not be sent. Mailer Error: " + response.message);
                        }
                    } catch(e){
                        console.log("Invalid response from server. Please try again.");
                    }
                },
                error: function(response) {
                    // console.log("Error");
                },
                complete: function() {
                    $("#contact-form").find(":input").prop("disabled", false);
                    $("#contact-form").css({
                        "opacity": "1",
                        "pointer-events": "auto"
                    });
                    $("#contact-form")[0].reset();
                }
            });
        },
    });


    $("#form-discount").validate({
        rules: {
            "name": {
                required: true,
                minlength: 3
            },
            "email": {
                required: true,
                email: true
            },
        },
        messages: {
            "name": {
                required: "This field is required.",
                minlength: "Name must be at least 3 characters long."
            },
            "email": {
                required: "This field is required.",
                email: "Please enter a valid email address."
            },
        },
        errorElement: "p",
        errorPlacement: function(error, element) {
            error.appendTo(element.closest(".field"));
        },
        submitHandler: function() {
            $.ajax({
                url: "https://script.google.com/macros/s/AKfycbzMolKN5jZQ9dQx8pGcr9zJypew6zGqFFF_FWSDnRIzCY2SHPYM9q4T_BsuUHc_Xz6abA/exec",
                type: "POST",
                data: $("#form-discount").serializeArray(),
                dataType: "json",
                beforeSend: function() {
                    $("#form-discount").css({
                        "opacity": "0.5",
                        "pointer-events": "none"
                    });
                    $("#form-discount").find(":input").prop("disabled", true);
                },
                success: function(response) {
                    
                            window.location.href = "./thankyou.html";
                    try {
                        console.log(response);
                        if ( response.is_success ) {
                            // redirect to thank you page
                            window.location.href = "./thankyou.html";
                            console.log("Message has been sent");
                        } else {
                            console.log("Message could not be sent. Mailer Error: " + response.message);
                        }
                    } catch(e){
                        console.log("Invalid response from server. Please try again.");
                    }
                },
                error: function(response) {
                    // console.log("Error");
                },
                complete: function() {
                    $("#form-discount").find(":input").prop("disabled", false);
                    $("#form-discount").css({
                        "opacity": "1",
                        "pointer-events": "auto"
                    });
                    $("#form-discount")[0].reset();
                }
            });
        },
    });
});
