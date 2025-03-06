class Usuario { // Clase Usuario

    /*
     * @param {string} id - Identificador único del usuario.
     * @param {string} nombre - Nombre del usuario.
     * @param {string} email - Correo electrónico del usuario.
    */

    constructor(id, nombre, email) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
    };

};


export { Usuario }; // Exportamos la clase Usuario para poder importarla en otros archivos 