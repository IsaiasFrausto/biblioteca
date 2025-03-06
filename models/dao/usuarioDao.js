import { db } from "../../firebase-config.js";
import { Usuario } from "../usuario.js";
import { collection, getDoc, getDocs, doc, setDoc, updateDoc, deleteDoc, query, where } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

class UsuarioDAO {  // Data Access Object para gestionar la colección de usuarios en Firebase.
    static async agregarUsuario(usuario) {  // Método para agregar un usuario a la colección. {Usuario} usuario - Objeto de tipo Usuario a agregar.
      try {
        // ---------------------------------------------------------------------
        // Verificar si el usuario ya existe en la base de datos
        const usuariosRef = collection(db, "usuarios"); 
        const q = query(usuariosRef, where("id", "==", usuario.id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          console.error("Error: El usuario ya está registrado.");
          return;
        }
        // ---------------------------------------------------------------------

        await setDoc(doc(db, "usuarios", usuario.id.toString()), { 
          nombre: usuario.nombre,
          email: usuario.email
        });
        console.log("Usuario agregado correctamente"); 
      } catch (error) {
        console.error("Error al agregar el usuario:", error);
      }
    }
  
    static async obtenerUsuarios() {  // Obtiene todos los usuarios de Firebase. {Promise<Usuario[]>} regresa una lista de usuarios
      try {
        const querySnapshot = await getDocs(collection(db, "usuarios"));
        let usuarios = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          usuarios.push(new Usuario(doc.id, data.nombre, data.email));
        });
        return usuarios;
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        return [];
      }
    }


    static async actualizarUsuario(id, datosActualizados) {  
      try {
          const usuarioRef = doc(db, "usuarios", id);
          await updateDoc(usuarioRef, datosActualizados);
          console.log("Usuario actualizado correctamente.");
      } catch (error) {
          console.error("Error al actualizar el usuario:", error);
      }
    }

    static async eliminarUsuario(id) {  
      try {
          const usuarioRef = doc(db, "usuarios", id);
          const usuarioSnap = await getDoc(usuarioRef);

          if (!usuarioSnap.exists()) {
              console.error("Error: No se puede eliminar, el usuario no existe.");
              return;
          }

          // Verificar si el usuario tiene préstamos activos
          const prestamosRef = collection(db, "prestamos");
          const q = query(prestamosRef, where("usuarioId", "==", id));
          const prestamosSnapshot = await getDocs(q);

          if (prestamosSnapshot.size > 0) {
              console.error("Error: No se puede eliminar el usuario porque tiene préstamos registrados.");
              return;
          }

          await deleteDoc(usuarioRef);
          console.log("Usuario eliminado correctamente.");
      } catch (error) {
          console.error("Error al eliminar el usuario:", error);
      }
    }

}
  
export { UsuarioDAO };


