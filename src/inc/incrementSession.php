<?php
session_start();

if(isset($_POST['guess']) && isset($_POST['randomPath'])) {
    $guess = $_POST['guess'];
    $randomPath = $_POST['randomPath'];

    // Assuming $_SESSION['streamer'] exists and initialized previously
    if($guess == $randomPath) {
        $_SESSION['streamer'] += 1;
    } else {
        $_SESSION['streamer'] -= 1;
    }   

    // Optionally, you can return any response if needed
    echo "Session variable incremented successfully";
} else {
    // Handle the case when guess or randomPath is not set
    echo "Error: guess or randomPath is not set";
}
?>
