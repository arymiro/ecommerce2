export class Producto {
    #id;
    #idCategoria;
    #nombre;
    #precio;
    #descripcion;
    #imagenUrl;
    #cantidad;
    
    constructor(id, idCategoria, nombre, precio, descripcion, imagenUrl, cantidad){
        this.#id = id;
        this.#idCategoria = idCategoria;
        this.#nombre = nombre;
        this.#precio = precio;
        this.#descripcion = descripcion;
        this.#imagenUrl = imagenUrl;
        this.#cantidad = cantidad;
    }

    toString(){
        let json = {};
            json.id = this.#id;
            json.idCategoria = this.#idCategoria;
            json.nombre = this.#nombre;
            json.precio = this.#precio;
            json.descripcion = this.#descripcion;
            json.imagenUrl = this.#imagenUrl;
            json.cantidad = this.#cantidad;
        return JSON.stringify(json);
    }

    obtenerMontoTotal(){
        return this.#precio * this.#cantidad;
    }

    setId(id){
        this.#id = id;
    }

    obtenerId(){
        return this.#id;
    }

    setIdCategoria(idCategoria){
        this.#idCategoria = idCategoria;
    }

    obtenerIdCategoria(){
        return this.#idCategoria;
    }

    setNombre(nombre){
        this.#nombre = nombre;
    }

    obtenerNombre(){
        return this.#nombre;
    }

    setPrecio(precio){
        return this.#precio = precio;
    }

    obtenerPrecio(){
        return this.#precio;
    }

    setDescripcion(descripcion){
        this.#descripcion = descripcion;
    }

    obtenerDescripcion(){
        return this.#descripcion;
    }

    setImagenUrl(url){
        this.#imagenUrl;
    }

    obtenerImagenUrl(){
        return this.#imagenUrl;
    }

    setCantidad(cantidad){
        this.#cantidad = cantidad;
    }

    obtenerCantidad(){
        return this.#cantidad;
    }
}