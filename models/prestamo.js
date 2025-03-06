class Prestamo {  // Clase Prestamo con métodos y atributos

    /*
     * @param {string} id - Identificador único del préstamo.
     * @param {string} usuarioId - ID del usuario que realiza el préstamo.
     * @param {string} libroId - ID del libro prestado.
     * @param {string} fechaInicio - Fecha de inicio del préstamo.
     * @param {string} fechaVencimiento - Fecha de vencimiento del préstamo.
     * @param {string} estado - Estado del préstamo (Activo, Devuelto, etc.).
    */


    constructor(id, usuarioId, libroId, fechaInicio, fechaVencimiento, estado) {
        this.id = id;
        this.usuarioId = usuarioId;  
        this.libroId = libroId;  
        this.fechaInicio = fechaInicio;
        this.fechaVencimiento = fechaVencimiento;
        this.estado = estado;
    };

};

export { Prestamo }; // Exportamos la clase Prestamo para poder importarla en otros archivos 