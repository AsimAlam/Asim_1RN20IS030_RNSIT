function getFormValue(e) {
    e.preventDefault();
    var params = {
        userName: document.getElementById("userName").value,
        password: document.getElementById("password").value,
    }

    $.ajax({
        type: "POST",
        url: "php/login.php",
        data: params,
        success: function (response) {
            response = JSON.parse(response);
            console.log(response);
            if (response.success) {
                console.log("Login Successful");
                console.log(response)
                localStorage.setItem("email", response.user.email)
                window.location.href = "profile.html"
            } else {
                $("#errorMessage").text("*" + response.data);
            }
        },
        error: function (error) {
            console.log(error.responseText);
        },
    });

}

function reg(e) {
    e.preventDefault();
    window.location.href = "register.html";
}