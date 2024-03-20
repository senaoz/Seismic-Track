<?php
$host = "localhost";
$username = "root";
$password = "Senaoz/2001";
$dbname = "earthquake_monitoring";

// create connection
$conn = new mysqli($host, $username, $password, $dbname);

// check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>

