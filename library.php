<?php
function getTodos(){
    $data_file = fopen("./data-1.json","r");
    $data_reader = fread($data_file, filesize("./data-1.json"));
    $data = json_decode ($data_reader, true);
    fclose($data_file);
    return  ($data);
}    

?>

