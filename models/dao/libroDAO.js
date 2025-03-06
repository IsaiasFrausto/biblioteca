import { db } from "../../firebase-config.js" // Importamos la conexión a Firebase
import { Libro } from "../libro.js"; // Importamos la clase Libro
import { collection, query, where, getDocs, updateDoc,doc, setDoc, deleteDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

class LibroDAO {  // Data Access Object para gestionar la colección de libros en Firebase
  static async agregarLibro(libro) {   // Agrega un nuevo libro a Firebase. {libro} libro - Objeto de tipo Libro a agregar.
    try {
      
      // Verificar si el libro ya existe en la base de datos
      const librosRef = collection(db, "libros");
      const q = query(librosRef, where("titulo", "==", libro.titulo), where("autor", "==", libro.autor));
      const querySnapshot = await getDocs(q); 

      if (!querySnapshot.empty) {
        console.error("Error: El libro ya está registrado.");
        return;
      }

      await setDoc(doc(db, "libros", libro.id.toString()), {
        titulo: libro.titulo,
        autor: libro.autor,
        genero: libro.genero,
        estado: libro.estado, 
      });
      
      console.log("Libro agregado correctamente"); 
    } catch (error) {
      console.error("Error al agregar el libro:", error);
    }
  }

  static async obtenerLibros() {  // Obtiene todos los libros de Firebase. {Promise<Libro[]>} regresa una lista de libros
    try {
      const querySnapshot = await getDocs(collection(db, "libros"));
      let libros = [];
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        libros.push(new Libro(doc.id, data.titulo, data.autor, data.genero, data.estado));
      });;
      return libros;
    } catch (error) {
      console.error("Error al obtener los libros:", error);
      return [];
    }
  }


  static async actualizarLibro(id, datosActualizados) {  
    try {
        const libroRef = doc(db, "libros", id);
        await updateDoc(libroRef, datosActualizados);
        console.log("Libro actualizado correctamente.");
    } catch (error) {
        console.error("Error al actualizar el libro:", error);
    }
  }

  static async eliminarLibro(id) {  
    try {
        const libroRef = doc(db, "libros", id);
        const libroSnap = await getDoc(libroRef);

        if (!libroSnap.exists()) {
            console.error("Error: No se puede eliminar, el libro no existe.");
            return;
        }

        // Verificar si el libro tiene préstamos activos
        const prestamosRef = collection(db, "prestamos");
        const q = query(prestamosRef, where("libroId", "==", id));
        const prestamosSnapshot = await getDocs(q);

        if (prestamosSnapshot.size > 0) {
            console.error("Error: No se puede eliminar el libro porque tiene préstamos registrados.");
            return;
        }

        await deleteDoc(libroRef);
        console.log("Libro eliminado correctamente.");
    } catch (error) {
        console.error("Error al eliminar el libro:", error);
    }
  }

}

export { LibroDAO };
