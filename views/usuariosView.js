import { UsuarioController } from "../controllers/usuarioController.js";

document.addEventListener("DOMContentLoaded", async () => {
    const usuarioForm = document.getElementById("usuarioForm");
    const usuarioList = document.getElementById("usuarioList");

    async function cargarUsuarios(){
        usuarioList.innerHTML = ""; //Limpiamos la lista
        const usuarios = await UsuarioController.obtenerUsuarios();

        usuarios.forEach(usuario =>{
            const li = document.createElement("li");
            li.innerHTML = `
                ID:${usuario.id} - ${usuario.nombre} - ${usuario.email}
                <button data-id="${usuario.id}" class="eliminar">❌</button>
                <button data-id="${usuario.id}" class="editar">✏️</button>
            `;
            usuarioList.appendChild(li);
        });
    }

    usuarioForm.addEventListener("submit", async (e) =>{
        //esto es para que no se recargue la página al enviar el formulario
        e.preventDefault();
        //obtenemos los valores de los campos del formulario
        const id = document.getElementById("id").value;
        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;

        await UsuarioController.agregarUsuario(id, nombre, email);
        usuarioForm.reset(); //limpiamos el formulario
        cargarUsuarios(); //actualizamos la lista de usuarios
    });

    usuarioList.addEventListener("click", async (e) =>{
        if(e.target.classList.contains("eliminar")){
            const id = e.target.getAttribute("data-id")
            await UsuarioController.eliminarUsuario(id);
            cargarUsuarios();
        }else if(e.target.classList.contains("editar")){
            const id = e.target.getAttribute("data-id");
            // Pedir nuevos valores al usuario
            const nuevoNombre = prompt("Ingrese el nombre actualizado:", nombre);
            const nuevoEmail = prompt("Ingrese el nuevo email:", email);

            // Verificar si el usuario ingresó valores válidos
            if (nuevoEmail && nuevoNombre) {
                const datosActualizados = {
                    nombre: nuevoNombre,
                    email: nuevoEmail
                };

            await UsuarioController.actualizarUsuario(id, datosActualizados);
            cargarUsuarios();
        }
    }
    });

    await cargarUsuarios();
});