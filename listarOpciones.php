<?php
    session_start();
    require('library.php');
    $tipo = $_POST["tipo"];
    $response = getTodos();
    $ciudades= [];
   
    foreach ($response as $casa ){
        array_push($ciudades,$casa[$tipo] );
    } 
    $result = array_unique($ciudades);
    sort($result);
    echo json_encode($result)
    //echo $ciudades;
?>


