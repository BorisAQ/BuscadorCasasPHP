<?php
    session_start();
    require('library.php');
    $response = getTodos();
    echo json_encode($response);
?>

