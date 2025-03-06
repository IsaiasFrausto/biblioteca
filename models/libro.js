class Libro {    // Clase Libro con métodos y atributos

    /*
     * @param {string} id - identificador único del libro
     * @param {string} titulo - Título del libro.
     * @param {string} autor - Autor del libro.
     * @param {string} genero - Género literario del libro.
     * @param {string} estado - Estado del libro (Disponible, Prestado, etc.).
    */

    constructor(id, titulo, autor, genero, estado) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.genero = genero;
        this.estado = estado; // Disponible, Prestado, etc.
    };
};


export {Libro}; // Exportamos la clase Libro para poder importarla en otros archivos 