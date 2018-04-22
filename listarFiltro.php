<?php
    session_start();
    require('library.php');
    
    $ciudad = $_POST["ciudad"];
    $tipo = $_POST["tipo"];
    $precio_base = floatval($_POST["precio_base"]);
    $precio_tope = floatval($_POST["precio_tope"]);
    
    $cidudades_aplica=[];
    $response = getTodos();


    foreach($response as $casa){
       $valor =str_replace('$','',$casa["Precio"]);

        
       if ( floatval(str_replace(',','',$valor)) >= $precio_base  and floatval(str_replace(',','',$valor)) <= $precio_tope){
            if($ciudad ==''){
                //toads las ciudades
                if ($tipo==''){
                    //todos los tipos
                    array_push ($cidudades_aplica, $casa); 
                }else{
                    //solo un tipo
                    if($casa["Tipo"]== $tipo){
                        array_push ($cidudades_aplica, $casa); 
                    }
                }
            }else{
                if ($ciudad == $casa["Ciudad"]){
                    if ($tipo==''){
                        //todos los tipos
                        array_push ($cidudades_aplica, $casa); 
                    }else{
                        //solo un tipo
                        if($casa["Tipo"]== $tipo){
                            array_push ($cidudades_aplica, $casa); 
                        }
                    }
                }
            }
            

       }
        /*if ( $casa["Ciudad"]== $ciudad){
            array_push ($cidudades_aplica, $casa);    
        }*/
        
    }
    echo json_encode($cidudades_aplica );
?>

