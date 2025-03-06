import { PrestamoDAO } from "../models/dao/prestamoDAO.js";
import { Prestamo } from "../models/prestamo.js";
import { UsuarioDAO } from "../models/dao/usuarioDao.js";

class PrestamoController {
  static async agregarPrestamo(id, usuarioId, libroId, fechaInicio, fechaVencimiento, estado) {  // Agrega un nuevo préstamo a la base de datos.
    
    // Validar que los usuarios no estén vacíos 
    if (!id || !usuarioId || !libroId || !fechaInicio || !fechaVencimiento || !estado) {
      console.error("Todos los campos son obligatorios."); 
      return;
    }

    // Verificar si el usuario existe en la base de datos 
    const usuarios = await UsuarioDAO.obtenerUsuarios();
    const usuarioExiste = usuarios.some(usuario => usuario.id === usuarioId);
    
    if (!usuarioExiste) {
      console.error("Error: El usuario no está registrado.");
      return;
    }

    const prestamo = new Prestamo(id, usuarioId, libroId, fechaInicio, fechaVencimiento, estado);
    await PrestamoDAO.agregarPrestamo(prestamo);
  }

  static async obtenerPrestamos() {  // Obtiene todos los préstamos de la base de datos.
    const prestamos = await PrestamoDAO.obtenerPrestamos();
    console.log("Préstamos obtenidos:", prestamos);
    return prestamos;
  }

  static async actualizarPrestamo(id, datosActualizados) {  
    if (!id || !datosActualizados) {
        console.error("ID y datos a actualizar son obligatorios.");
        return;
    }

    await PrestamoDAO.actualizarPrestamo(id, datosActualizados);
  }

  static async eliminarPrestamo(id) {  
    if (!id) {
        console.error("ID del préstamo es obligatorio para eliminar.");
        return;
    }

    await PrestamoDAO.eliminarPrestamo(id);
  }
}

export { PrestamoController };