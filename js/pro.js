function validateEmail(user_email) {
    console.log(user_email);
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //return ture for .com , .in , .co  upto 2 letter after .
    console.log(re.test(String(user_email).toLowerCase()));
    return re.test(String(user_email).toLowerCase());
}

var loggedInUser = localStorage.getItem('email')
// console.log(loggedInUser)
$.ajax({
    type: "GET",
    url: "php/profile.php",
    data: { email: loggedInUser },
    success: function (response) {
        console.log("34567890-");
        response = JSON.parse(response);
        console.log(response);
        var fullName;
        if (response.mongoUser && response.mongoUser.fullName) {
            fullName = response.mongoUser.fullName;
            console.log("inside")
        } else if (response.sqlUser) {
            fullName = response.sqlUser.fname + " " + response.sqlUser.lname;
        }
        $("#user-name").text(fullName);
        $("#user-email").text(response.sqlUser.email);
        $("#fullName").val(fullName);
        $("#email").val(response.sqlUser.email);
        $("#phone").val(response.mongoUser?.phone);
        $("#age").val(response.mongoUser?.age);
        $("#dob").val(response.mongoUser?.dob);
        $("#Street").val(response.mongoUser?.Street);
        $("#city").val(response.mongoUser?.city);
        $("#zIp").val(response.mongoUser?.zIp);
        $("#sTate").val(response.mongoUser?.sTate);
    },
    error: function (error) {
        console.log(error.responseText);
    },
});

function validate(e) {
    e.preventDefault();

    var emailValid = validateEmail(document.getElementById("email").value);
    var params = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        age: document.getElementById("age").value,
        dob: document.getElementById("dob").value,
        Street: document.getElementById("Street").value,
        city: document.getElementById("city").value,
        sTate: document.getElementById("sTate").value,
        zIp: document.getElementById("zIp").value,
    };

    emailValid ?
        console.log(params)
        :
        alert("Please Check Email");

    $.ajax({
        type: "POST",
        url: "php/profile.php",
        data: params,
        success: function (response) {
            response = JSON.parse(response);
            console.log(response);

            // if (response.data === "User already exists") {
            //     $("#errorMessage").text("*"+response.data);
            // } else {
            //     // console.log("Registered Successfully");
            //     // console.log(response);
            //     window.location.href="login.html"
            // }


            $("#user-name").text(response.user.fullName);
            $("#user-email").text(response.user.email);
            $("#fullName").val(response.user.fullName);
            $("#phone").val(response.user.phone);
            $("#age").val(response.user.age);
            $("#dob").val(response.user?.dob);
            $("#Street").val(response.user?.Street);
            $("#city").val(response.user?.city);
            $("#zIp").val(response.user?.zIp);
            $("#sTate").val(response.user?.sTate);



        },
        error: function (error) {
            console.log(error.responseText);
        },
    });
}

function logout() {
    $.ajax({
        type: "DELETE",
        url: "php/profile.php",
        success: function (response) {
            response = JSON.parse(response);
            console.log(response);
            localStorage.removeItem('email');
            window.location.href = "login.html";
        },
        error: function (error) {
            console.log(error.responseText);
        },
    });
}

