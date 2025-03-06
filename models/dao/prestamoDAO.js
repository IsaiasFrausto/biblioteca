import { db } from "../../firebase-config.js";
import { Prestamo } from "../prestamo.js";
import { collection, query, where, getDocs, addDoc, updateDoc,doc, setDoc, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

class PrestamoDAO { // Data Access Object para gestionar la colección de préstamos en Firebase.
    static async agregarPrestamo(prestamo) {  // Agrega un nuevo préstamo a Firebase. {Prestamo} prestamo - Objeto de tipo Prestamo a agregar.
      try {

        // -----------------------------------------------
        const libroRef = doc(db, "libros", prestamo.libroId);
        const libroSnap = await getDoc(libroRef); 

            // Verificar si el libro existe en la base de datos
        if (!libroSnap.exists()) {
          console.error("Error: El libro no existe.");
          return;
        }

        const libroData = libroSnap.data();
        if (libroData.estado === "Prestado") {
            console.error("No se puede prestar el libro. Ya está prestado.");
            return;
        }

        // -----------------------------------------------

        // Agregar el préstamo si el libro está disponible
        await setDoc(doc(db, "prestamos", prestamo.id.toString()), {
          usuarioId: prestamo.usuarioId,  // --------
          libroId: prestamo.libroId,  // -----------
          fechaInicio: prestamo.fechaInicio,
          fechaVencimiento: prestamo.fechaVencimiento,
          estado: prestamo.estado  
        }); 
        console.log("Préstamo agregado correctamente");

        await setDoc(libroRef, {estado: "Prestado"}, { merge: true}); // Cambia el estado del libro a "Prestado"  ------

      } catch (error) {
        console.error("Error al agregar el préstamo:", error);
      }
    }
  
    static async obtenerPrestamos() {  // Obtiene todos los préstamos de Firebase. {Promise<Prestamo[]>} regresa una lista de préstamos
      try {
        const querySnapshot = await getDocs(collection(db, "prestamos"));
        let prestamos = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          //aqui cambie los data
          prestamos.push(new Prestamo(doc.id, data.usuarioId, data.libroId, data.fechaInicio, data.fechaVencimiento, data.estado));
        });
        return prestamos;
      } catch (error) {
        console.error("Error al obtener los préstamos:", error);
        return [];
      }
    }


    static async actualizarPrestamo(id, datosActualizados) {  
      try {
          const prestamoRef = doc(db, "prestamos", id);
          await updateDoc(prestamoRef, datosActualizados);
          console.log("Préstamo actualizado correctamente.");
      } catch (error) {
          console.error("Error al actualizar el préstamo:", error);
      }
    }

    static async eliminarPrestamo(id) {  
      try {
          const prestamoRef = doc(db, "prestamos", id);
          const prestamoSnap = await getDoc(prestamoRef);

          if (!prestamoSnap.exists()) {
              console.error("Error: El préstamo no existe.");
              return;
          }

          const prestamoData = prestamoSnap.data();
          
          // Verificar si el préstamo tiene un libro asociado antes de modificar su estado
          if (prestamoData.libroId) {
              const libroRef = doc(db, "libros", prestamoData.libroId);
              await updateDoc(libroRef, { estado: "Disponible" });
          }

          // Eliminar el préstamo
          await deleteDoc(prestamoRef);
          console.log("Préstamo eliminado correctamente.");

      } catch (error) {
          console.error("Error al eliminar el préstamo:", error);
      }
  }


}
  
export { PrestamoDAO };



