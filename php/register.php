<?php
require_once 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fname = $_POST["fName"];
    $lname = $_POST["lName"];
    $password = $_POST["password"];
    $email = $_POST["email"];

    $getExistingUserQuery = "SELECT * FROM user WHERE email='$email'";
    $getExistingUser = $mysql_conn->query($getExistingUserQuery);

    if ($getExistingUser->num_rows > 0) {
        echo json_encode(['success' => true, 'data' => "User already exists"]);
    } else {
        $sql = "INSERT INTO user (fname, lname, password, email) VALUES ('$fname', '$lname', '$password', '$email')";
        $result = $mysql_conn->query($sql);

        if ($result) {
            echo json_encode(['success' => true, 'data' => "Registered Successfully"]);
        } else {
            echo json_encode(['success' => false, 'data' => "Registration Failed"]);
        }
    }
}
?>
