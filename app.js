import { LibroController } from "./controllers/libroController.js";
import { UsuarioController } from "./controllers/usuarioController.js";
import { PrestamoController } from "./controllers/prestamoController.js";

console.log("===== PRUEBAS DEL SISTEMA =====");

// // 🚀 1️⃣ Probar agregar libros y usuarios
// console.log("\n📌 Agregando libros y usuarios...");
// await LibroController.agregarLibro("2", "Libro prueba 2", "Autor 2", "Genero prueba", "Disponible");
// await UsuarioController.agregarUsuario("1", "Pedro Ramírez", "pedro@ejemplo.com");
// await UsuarioController.agregarUsuario("1", "Alejandra Guizar", "alejandra@ejemplo.com");
// await PrestamoController.agregarPrestamo("1", "1", "1", "03/03/2025", "06/03/2025", "Prestado");

// // 🚀 2️⃣ Intentar agregar duplicados (debe fallar)
// console.log("\n📌 Probando agregar un libro duplicado (debe fallar)...");
// await LibroController.agregarLibro("2", "Libro prueba 1", "Autor 1", "Genero prueba", "Disponible");

// console.log("\n📌 Probando agregar un usuario duplicado (debe fallar)...");
// await UsuarioController.agregarUsuario("1", "Pedro Ramírez", "pedro@ejemplo.com");
// await UsuarioController.agregarUsuario("1", "Pedro Ramírez", "pedro@ejemplo.com"); 

// 🚀 3️⃣ Probar actualización de libros y usuarios
// console.log("\n📌 Actualizando libro...");
// await LibroController.actualizarLibro("1", { estado: "Prestado" });

// console.log("\n📌 Actualizando usuario...");
// await UsuarioController.actualizarUsuario("1", { nombre: "Pedro" });

// // 🚀 4️⃣ Probar agregar préstamo
// console.log("\n📌 Agregando préstamo...");
// await PrestamoController.agregarPrestamo("2", "1", "2", "03/03/2025", "05/03/2025", "Activo");

// // 🚀 5️⃣ Intentar eliminar un libro con préstamo activo (debe fallar)
// console.log("\n📌 Intentando eliminar libro con préstamo activo (debe fallar)...");
// await LibroController.eliminarLibro("2");

// // 🚀 6️⃣ Intentar eliminar un usuario con préstamo activo (debe fallar)
// console.log("\n📌 Intentando eliminar usuario con préstamo activo (debe fallar)...");
// await UsuarioController.eliminarUsuario("1");

// // 🚀 7️⃣ Eliminar préstamo y verificar que el libro se vuelve disponible
// console.log("\n📌 Eliminando préstamo...");
// await PrestamoController.eliminarPrestamo("2");        

// console.log("\n📌 Verificando que el libro ahora está disponible...");
// await LibroController.obtenerLibros();

// // 🚀 8️⃣ Intentar eliminar el libro y el usuario nuevamente (ahora sí debe funcionar)
// console.log("\n📌 Eliminando libro...");
// await LibroController.eliminarLibro("2");   

// console.log("\n📌 Eliminando usuario...");
// await UsuarioController.eliminarUsuario("1"); 

// // 🚀 9️⃣ Obtener datos finales
// console.log("\n📌 Libros restantes:");
// await LibroController.obtenerLibros();

// console.log("\n📌 Usuarios restantes:");
// await UsuarioController.obtenerUsuarios();

// console.log("\n📌 Préstamos restantes:");
// await PrestamoController.obtenerPrestamos();

// console.log("\n✅ Todas las pruebas han finalizado.");

