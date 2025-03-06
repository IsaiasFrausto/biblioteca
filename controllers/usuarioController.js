import { UsuarioDAO } from "../models/dao/usuarioDao.js";
import { Usuario } from "../models/usuario.js";

class UsuarioController {
  static async agregarUsuario(id, nombre, email) {  // Agrega un nuevo usuario a la base de datos.
    if (!id || !nombre || !email) {
      console.error("Todos los campos son obligatorios.");
      return;
    }

    const usuario = new Usuario(id, nombre, email);
    await UsuarioDAO.agregarUsuario(usuario);
  }

  static async obtenerUsuarios() {   // Obtiene todos los usuarios de la base de datos.
    const usuarios = await UsuarioDAO.obtenerUsuarios();
    console.log("Usuarios obtenidos:", usuarios);
    return usuarios;
  }

  static async actualizarUsuario(id, datosActualizados) {  
    if (!id || !datosActualizados) {
        console.error("ID y datos a actualizar son obligatorios.");
        return;
    }

    await UsuarioDAO.actualizarUsuario(id, datosActualizados);
  }

  static async eliminarUsuario(id) {  
    if (!id) {
        console.error("ID del usuario es obligatorio para eliminar.");
        return;
    }

    await UsuarioDAO.eliminarUsuario(id);
  }
}

export { UsuarioController };