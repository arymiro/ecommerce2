import {Producto} from './Producto.js';
import {Carrito} from './Carrito.js';
import {Almacenamiento} from './Almacenamiento.js';

var data = [];

function leerArchivoJson(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function transformarObjetoJsonAProducto(json){
    let producto = new Producto(json.id, json.idCategoria, json.nombre, json.precio, json.descripcion, json.imagenUrl, json.cantidad);
    return producto;
}

function actualizarCantidadCarritoUI(cantidad){
    document.getElementById("idCantidadCarrito").textContent = cantidad;
}

function mostrarDetalleCarritoUI(carrito){
    limpiarTablaUI("tablaProductosCarrito");
    document.getElementById("total").textContent = carrito.obtenerTotalApagar();
    let tabla = document.getElementById("tablaProductosCarrito");
    for(let i = 1; i <= carrito.obtenerListaProductos().length; i++){
        agregarFila(tabla, i, carrito.obtenerListaProductos()[i-1]);
    }
}

function irAdetalleProducto(event){
    event.preventDefault();
    let idTag = event.currentTarget.id;
    let listaPartes = idTag.split("-");
    let almacenamiento = new Almacenamiento();
    almacenamiento.registrarDatos("idProductoSeleccionado", listaPartes[1]);  
    window.location.href="pagina4.html";  
}

function irAproductosPorCategoria(event){
    event.preventDefault();
    const idCategoriaSeleccionada = (event.currentTarget.id == "categoriaMujer"? 1: 2);  
    let almacenamiento = new Almacenamiento();
    almacenamiento.registrarDatos("idCategoriaSeleccionada", idCategoriaSeleccionada);  
    window.location.href="pagina3.html";    
}

function obtenerProductosPorCategoria(idCategoria){
    let listaProductos = data.filter(element => element.idCategoria == idCategoria);

    return listaProductos;
}

function agregarFila(tabla, posicion, producto){
    let fila = tabla.insertRow(posicion);
    for(let i = 0; i < 4; i++){
        let celda = fila.insertCell(i);

        switch(i){
            case 0: 
                celda.innerHTML = producto.obtenerNombre();
                break;
            case 1: 
                celda.innerHTML = producto.obtenerCantidad();
                break;
            case 2: 
                celda.innerHTML = producto.obtenerPrecio();
                break;
            case 3: 
                celda.innerHTML = producto.obtenerMontoTotal();
                break;
        }
    }   
}

function limpiarTablaUI(idTabla){
    let tabla = document.getElementById(idTabla);
    let cantidadFilas = tabla.rows.length;
    for (let indice = cantidadFilas-1; indice > 0; indice--) {
        tabla.deleteRow(indice);
    }
}

function cargarIndexHtml(){
    agregarEventoOnclick();
}

function agregarEventoOnclick(){
    let elementCategoriaMujer = document.getElementById("categoriaMujer"); 
    let elementCategoriaHombre = document.getElementById("categoriaHombre"); 
    elementCategoriaMujer.onclick = irAproductosPorCategoria; 
    elementCategoriaHombre.onclick = irAproductosPorCategoria;
}

function cargarPaginaDosHtml(){
    let almacenamiento = new Almacenamiento();
    let lista = JSON.parse(almacenamiento.obtenerDatosPorKey("carrito"));
    let carrito = new Carrito();

    if(lista){
        for(let i = 0; i < lista.length; i++){
            carrito.agregarProducto(transformarObjetoJsonAProducto(JSON.parse(lista[i])));
        }
    }
    mostrarDetalleCarritoUI(carrito);
}

function cargarPaginaCuatroHtml(){
    let almacenamiento = new Almacenamiento();
    let idProducto = almacenamiento.obtenerDatosPorKey("idProductoSeleccionado");
    let producto = data.find(element => element.id == idProducto);
    document.getElementById("tituloProducto").innerHTML = producto.nombre;
    document.getElementById("precio").innerHTML = producto.precio;
    document.getElementById("descripcionProducto").innerHTML = producto.descripcion;
    document.getElementById('imgProducto').src = producto.imagenUrl;
    document.getElementById('agregarCarrito').onclick = agregarAlCarrito;
}

function agregarAlCarrito(event){
    let almacenamiento = new Almacenamiento();
    let lista = JSON.parse(almacenamiento.obtenerDatosPorKey("carrito"));
    let carrito = new Carrito();

    if(lista){
        for(let i = 0; i < lista.length; i++){
            carrito.agregarProducto(transformarObjetoJsonAProducto(JSON.parse(lista[i])));
        }
    }
    
    let cantidad = parseInt(document.getElementById('cantidadProducto').value, 10);
    let idProducto = almacenamiento.obtenerDatosPorKey("idProductoSeleccionado");
    let producto = data.find(element => element.id == idProducto);
    producto.cantidad = cantidad;
    carrito.agregarProducto(transformarObjetoJsonAProducto(producto));
    actualizarCantidadCarritoUI(carrito.obtenerListaProductos().length);
    almacenamiento.registrarDatos("carrito", JSON.stringify(carrito.toString()));
    window.location.href="pagina3.html";   
}

function cargarPaginaTresHtml(){
    agregarEventoOnclick();
    limpiarGrilla();    
    let almacenamiento = new Almacenamiento();
    let idCategoria = almacenamiento.obtenerDatosPorKey("idCategoriaSeleccionada");
    let listaProductosCategoria = obtenerProductosPorCategoria(idCategoria);  
    let boxContainerId = 0;
    let contElementosFila = 0;
    
    for(let i = 0; i < listaProductosCategoria.length; i++){
        let producto = listaProductosCategoria[i];

        if(contElementosFila == 0){
            document.getElementById('divListaProductos').innerHTML += '<div id="box-container' + boxContainerId + '" class = "box-container"></div>';
        }

        let html = '<div class = "box">'+
                       '<a id = "box-' + producto.id + '" href="#"> ' +
                           '<img class="imgProducto" src="' + producto.imagenUrl + '"></img> ' +
                           '<ul>' +
                              '<li><strong>' + producto.nombre + '</strong></li> ' +
                              '<li class="precio">' + producto.precio + '</li> ' +
                           '</ul>' +
                       '</a> ' +                        
                    '</div>';

        let id = "box-container" + boxContainerId;
        document.getElementById(id).innerHTML += html;
        
        if(contElementosFila == 3){
            contElementosFila = 0;
            ++boxContainerId;
        }else{
            ++contElementosFila;
        }
    }

    for(let i = 0; i < listaProductosCategoria.length; i++){
        let producto = listaProductosCategoria[i];

        let idTagA = 'box-'+producto.id;
        let tagA = document.getElementById(idTagA);
        tagA.onclick= irAdetalleProducto;
    }
}


function limpiarGrilla(){
    let div = document.getElementById('divListaProductos');
    while(div.firstChild){
        div.removeChild(div.firstChild);    
    }    
}

function iniciarSitio(){
    leerArchivoJson("js/data.json", function(text){
        data = JSON.parse(text);
        let paginaActual = location.pathname;
        let almacenamiento = new Almacenamiento();
        let lista = JSON.parse(almacenamiento.obtenerDatosPorKey("carrito"));
        let carrito = new Carrito();
    
        if(lista){
            for(let i = 0; i < lista.length; i++){
                carrito.agregarProducto(transformarObjetoJsonAProducto(JSON.parse(lista[i])));
            }
        }

        actualizarCantidadCarritoUI(carrito.obtenerListaProductos().length);
    
        switch(paginaActual){
            case "/index.html":
                cargarIndexHtml();
                break;
            case "/pagina2.html":
                cargarPaginaDosHtml();
                break;
            case "/pagina3.html":
                cargarPaginaTresHtml();
                break;
            case "/pagina4.html":
                cargarPaginaCuatroHtml();
                break;
            default:
                agregarEventoOnclick(); 
        }
        /*let almacenamiento = new Almacenamiento();
        carrito.agregarProducto(transformarObjetoJsonAProducto(data[0]));
        carrito.agregarProducto(transformarObjetoJsonAProducto(data[1]));
        console.log(carrito.obtenerListaProductos());
        actualizarCantidadCarritoUI(carrito.obtenerListaProductos().length);
        almacenamiento.registrarDatos("usss", JSON.stringify(carrito.toString()));
    
        console.log(almacenamiento.obtenerDatosPorKey("usss"));*/
        
        //limpiarTablaUI();
    });
}

window.onload = iniciarSitio;