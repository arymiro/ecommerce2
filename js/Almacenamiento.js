export class Almacenamiento {

    constructor(){}

    obtenerDatosPorKey(key){
        return localStorage.getItem(key);
    }

    registrarDatos(key, valor){
        localStorage.setItem(key, valor);
    }
}