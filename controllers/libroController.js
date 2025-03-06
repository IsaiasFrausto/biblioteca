import { LibroDAO } from "../models/dao/libroDAO.js";
import { Libro } from "../models/libro.js";

class LibroController {
    static async agregarLibro(id, titulo, autor, genero, estado) {  // Agrega un nuevo libro a la base de datos.
      if (!id || !titulo || !autor || !genero || !estado) {
        console.error("Todos los campos son obligatorios.");
        return;
      }
  
      const libro = new Libro(id, titulo, autor, genero, estado);
      await LibroDAO.agregarLibro(libro);
    }
  
    static async obtenerLibros() {  // Obtiene todos los libros de la base de datos.
      const libros = await LibroDAO.obtenerLibros();
      console.log("Libros obtenidos:", libros);
      return libros;
    }

    static async actualizarLibro(id, datosActualizados) {  
      if (!id || !datosActualizados) {
          console.error("ID y datos a actualizar son obligatorios.");
          return;
      }

      await LibroDAO.actualizarLibro(id, datosActualizados);
    }

    static async eliminarLibro(id) {  
      if (!id) {
          console.error("ID del libro es obligatorio para eliminar.");
          return;
      }

      await LibroDAO.eliminarLibro(id);
    }

}
  
export { LibroController };