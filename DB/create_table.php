<?php
$servername = "localhost";
$username = "Kevin";
$password = "Kevin";
$dbname = "filmoteca";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// sql to create table
$sql = "CREATE TABLE movies (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
reference VARCHAR(6) NOT NULL,
movie VARCHAR(30) NOT NULL,
email VARCHAR(50) NOT NULL,
formats VARCHAR (50) NOT NULL, 
director VARCHAR (30) NOT NULL, 
genere VARCHAR (15) NOT NULL, 
awards VARCHAR(11) NOT NULL,
anyo VARCHAR(11) NOT NULL
)";

if ($conn->query($sql) === TRUE) {
  echo "Table MyGuests created successfully";
} else {
  echo "Error creating table: " . $conn->error;
}

$conn->close();
