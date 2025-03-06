import { LibroController } from "../controllers/libroController.js";

// Código para manejar la vista de libros en la página web 
// DOMContentLoaded sirve para esperar a que el documento HTML esté completamente cargado antes de ejecutar el código JavaScript
document.addEventListener("DOMContentLoaded", async () => {
    const libroForm = document.getElementById("libroForm");
    const libroList = document.getElementById("libroList");

    // Función para cargar libros y mostrarlos en la lista
    async function cargarLibros() {
        libroList.innerHTML = "";  // Limpia la lista antes de actualizar
        const libros = await LibroController.obtenerLibros();
        
        libros.forEach(libro => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${libro.titulo}</strong> - ${libro.autor} (${libro.genero}) 
                - Estado: ${libro.estado} - ID: ${libro.id}
                <button data-id="${libro.id}" class="eliminar">❌</button>
                <button data-id="${libro.id}" class="editar">✏️</button>
            `;
            libroList.appendChild(li);
        });
    }

    //Manejar el envío del formulario para agregar libros
    libroForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const titulo = document.getElementById("titulo").value;
        const autor = document.getElementById("autor").value;
        const genero = document.getElementById("genero").value;
        const estado = document.getElementById("estado").value;
        
        const id = Date.now().toString(35) + Math.random().toString(36).slice(2);
        
        await LibroController.agregarLibro(id, titulo, autor, genero, estado);
        libroForm.reset();  // Limpiar formulario
        cargarLibros();  // Actualizar lista de libros
    });

    //Manejar la eliminación de libros
    libroList.addEventListener("click", async (e) => {
        if (e.target.classList.contains("eliminar")) {
            const id = e.target.getAttribute("data-id");
            await LibroController.eliminarLibro(id);
            cargarLibros();
        }else if(e.target.classList.contains("editar")){
            const id = e.target.getAttribute("data-id");
            // Pedir nuevos valores al usuario
            const nuevoTitulo = prompt("Ingrese el nuevo o actualizado título:", titulo);
            const nuevoAutor = prompt("Ingrese el nuevo o actualizado autor:", autor);
            const nuevoGenero = prompt("Ingrese el nuevo o actualice el genero:", genero);

            // Verificar si el usuario ingresó valores válidos
            if (nuevoTitulo && nuevoGenero && nuevoAutor) {
                const datosActualizados = {
                    titulo: nuevoTitulo,
                    autor: nuevoAutor,
                    genero: nuevoGenero
                };

            await LibroController.actualizarLibro(id, datosActualizados);
            cargarLibros();
        }
    }
    });

    //Cargar libros al iniciar la página
    await cargarLibros();
});