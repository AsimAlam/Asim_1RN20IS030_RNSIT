<?php
require_once 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["userName"];
    $password = $_POST["password"];

    // Use the email field for login
    $getExistingUserQuery = "SELECT * FROM user WHERE email='$email' AND password='$password'";
    $getExistingUser = $mysql_conn->query($getExistingUserQuery);

    $redis->set('loggedInUser',$email);
    
    if ($getExistingUser->num_rows == 0) {
        echo json_encode(['success' => false, 'data' => "User doesn't exist"]);
    } else {
        $userDetails = $getExistingUser->fetch_assoc();
        echo json_encode(['success' => true, 'data' => "Login Successful", 'user' => $userDetails]);
    }
}




// require_once 'config.php';

// if ($_SERVER["REQUEST_METHOD"] == "POST") {
//     $email = $_POST["userName"];
//     $password = $_POST["password"];

//     $getExistingUserQuery = "SELECT * FROM user WHERE email='$email' AND password='$password'";
//     $getExistingUser = $mysql_conn->query($getExistingUserQuery);
//     foreach ($user as $getExistingUser) {
//     echo $user . "\n";
// }
//     if ($getExistingUser->num_rows == 0) {
//         echo json_encode(['success' => false, 'data' => "User doesn't exist"]);
//     } else {
//         echo json_encode(['success' => true, 'data' => "Login Successful",'user'=>$getExistingUser]);
//     }
// }



    // if ($result->num_rows > 0) {
    //     // Create a session ID
    //     $session_id = bin2hex(random_bytes(32));

    //     // Store session ID in Redis with user information
    //     $redis_conn->set($session_id, json_encode(['username' => $username]));

    //     // Return session ID to the client
    //     echo json_encode(['session_id' => $session_id]);
    // } else {
    //     echo "Invalid username or password";
    // }

    // $stmt->close();
