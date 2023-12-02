$(document).ready(function() {
  $("#registrationForm").submit(function(e) {
      e.preventDefault();
      // console.log("Inside register API");
      var params = {
          fName: $("#fname").val(),
          lName: $("#lname").val(),
          email: $("#email").val(),
          password: $("#password").val(),
      };

      // console.log(params);
      $.ajax({
          type: "POST",
          url: "php/register.php",
          data: params,
          success: function(response) {
              response = JSON.parse(response);
              if (response.data === "User already exists") {
                  $("#errorMessage").text("*"+response.data);
              } else {
                  // console.log("Registered Successfully");
                  // console.log(response);
                  window.location.href="login.html"
              }
          },
          error: function(error) {
              console.log(error.responseText);
          },
      });
  });
});
