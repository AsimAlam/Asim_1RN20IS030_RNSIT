<?php
// MySQL Instance
$mysql_conn = new mysqli("localhost", "root", "", "guvi");

if ($mysql_conn->connect_error) {
    die("MySQL Connection failed: " . $mysql_conn->connect_error);
}


// Mongo Instance
$mongoManager = new MongoDB\Driver\Manager("mongodb://asimalam8:Asim123@ac-yogi2tv-shard-00-00.liakaku.mongodb.net:27017/fastfoodmern?ssl=true&replicaSet=atlas-lbmxxw-shard-0&authSource=admin&retryWrites=true&w=majority");
$mongoDatabase = "guvi";
$mongoCollection = "user";

// Redis Instance
$redis=new Redis();
$redis->connect('localhost',6379);
$redis->auth('password');