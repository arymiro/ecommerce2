export class Carrito {
    #listaProductos;

    constructor(){
        this.#listaProductos = [];
    }

    agregarProducto(producto){
        let index = this.#obtenerIndexProductoExistente(producto.obtenerId());
        if(index >= 0){
            let cantidadActual = this.#listaProductos[index].obtenerCantidad();
            this.#listaProductos[index].setCantidad(cantidadActual + producto.obtenerCantidad());
        }else{
            this.#listaProductos.push(producto);            
        }
    }

    eliminarProducto(id){
        let index = this.#obtenerIndexProductoExistente(producto.obtenerId());
        if(index >= 0){
            this.#listaProductos.splice(index, 1); 
        }
    }

    vaciarCarrito(){
        this.#listaProductos = [];
    }

    obtenerListaProductos(){
        return this.#listaProductos;
    }

    obtenerTotalApagar(){
        let totalApagar = 0;

        for(let i = 0; i < this.#listaProductos.length; i++){
            totalApagar += this.#listaProductos[i].obtenerMontoTotal();
        }

        return totalApagar;
    }

    #obtenerIndexProductoExistente(id){
        let index = -1;
        for(let i = 0; i <= this.#listaProductos.length-1; i++){
            if(this.#listaProductos[i].obtenerId() == id){
                index = i;
                break;
            }
        }
        
        return index;
    }

    toString(){
        let listaValor = [];
        
        for(const valor of this.#listaProductos){
            listaValor.push(valor.toString());
        };

        return listaValor; 
    }
}