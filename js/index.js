/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"    
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
    
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}



//Función que llena el archivo con los resultados:
function llenaContenido(data){    
    var gridCasas = $('#gridCasas');
    $('#gridCasas').empty();
    var casaTemplate="<div class='card horizontal'><div class='card-image small'><img src='./img/home.jpg'></div><div class='card-stacked'><div class='card-content'><p>Direccion: :direccion<br>Ciudad: :ciudad<br>Telefono: :telefono<br>Codigo Postal: :codigoPostal<br>Tipo: :tipo<br>Precio: <span  class='orange-text text-darken-2'>:precio</span><br>Ciudad: :ciudad<br></p></div><div class='card-action'><a href='#'>VER MAS</a></div></div></div>";
    $.each(JSON.parse(data) , function(i,item){
        //alert (item.Id +"Direccion:" + item.Direccion);
         var newCasaItem =  casaTemplate.replace (':direccion', item.Direccion).replace (':ciudad', item.Ciudad).replace (':telefono', item.Telefono).replace (':codigoPostal', item.Codigo_Postal).replace (':tipo', item.Tipo).replace (':precio', item.Precio)           
         gridCasas.append(newCasaItem);
         
    }) ;
}


function llenaCiudades(data){    
    var opciones = $("#selectCiudad");
    var itemTemplate = "<option value=':ciudad' >:ciudad</option>   "
    $.each(JSON.parse(data), function(i,item){        
        var itemNuevo =  itemTemplate.replace (':ciudad', item).replace (':ciudad', item);
        opciones.append(itemNuevo);       
    });
}


function llenaTipo(data){    
    var opciones = $("#selectTipo");
    var itemTemplate = "<option value=':tipo' >:tipo</option>   ";

    $.each(JSON.parse(data), function(i,item){        
        var itemNuevo =  itemTemplate.replace (':tipo', item).replace (':tipo', item);
        opciones.append(itemNuevo);       
    });
}


//Funiones ajax

function mostrarTodosLosResultados(){    
    $.ajax({
        url:"./listar.php",
        dataType:"text",
        cache:false,
        contentType:false,
        processData:false,
        type:'post',

        success:function(response){
           llenaContenido(response);
        },
        error:function(){
            alert("error");
        }
    });
}


//
function mostrarFiltroResultados(){  

    
    var slider = $("#rangoPrecio").data("ionRangeSlider");
    var from = slider.result.from;
    var to = slider.result.to;
   

    
    var parametros = {"ciudad": $("#selectCiudad").val(), "tipo":$("#selectTipo").val(), "precio_base":""+from, "precio_tope":""+to}; 
    $.ajax({
        url:"./listarFiltro.php",
        dataType:"text",
        data: parametros,
        type:'post',
        success:function(response){
    
  
           llenaContenido(response);
        },
        error:function(message){
            alert("error");
            alert(message);
        }
    });
}

function mostrarCiudades(){ 
    var parametros = {"tipo":"Ciudad"};   
    $.ajax({
        url:"./listarOpciones.php",
        dataType:"text",
        data:parametros,
        type:'post',
        success:function(response){
           llenaCiudades(response);
        },
        error:function(){
            alert("error ciudades");
        }
    });
}



function mostrarTipo(){ 
    var parametros = {"tipo":"Tipo"};   
    $.ajax({
        url:"./listarOpciones.php",
        dataType:"text",
        data:parametros,
        type:'post',

        success:function(response){
           llenaTipo(response);
        },
        error:function(){
            alert("error ciudades");
        }
    });
}





$(document).ready(function() {
    $('select').attr("class", "browser-default")

    inicializarSlider();

    playVideoOnScroll();
    mostrarCiudades();
    mostrarTipo();
    $("#mostrarTodos").click(mostrarTodosLosResultados);
   // $("#submitButton").click(mostrarFiltroResultados);
});