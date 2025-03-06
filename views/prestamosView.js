import { PrestamoController} from "../controllers/prestamoController.js";

document.addEventListener("DOMContentLoaded", async () => {
    const prestamoForm = document.getElementById("prestamoForm");
    const prestamoList = document.getElementById("prestamoList");

    async function cargarPrestamos(){
        prestamoList.innerHTML = ""; //Limpiamos la lista
        const prestamos = await PrestamoController.obtenerPrestamos();

        prestamos.forEach(prestamo =>{
            const li = document.createElement("li");
            li.innerHTML = `
                ${prestamo.usuarioId} - ${prestamo.libroId} <strong>(${prestamo.fechaInicio} - ${prestamo.fechaVencimiento})</strong> 
                - Estado: ${prestamo.estado} - ID: ${prestamo.id}
                <button data-id="${prestamo.id}" class="eliminar">❌
                </button> <button data-id="${prestamo.id}" class="editar">✏️</button>
            `;
            prestamoList.appendChild(li);
        });
    }

    prestamoForm.addEventListener("submit", async (e) =>{
        //esto es para que no se recargue la página al enviar el formulario
        e.preventDefault();
        //obtenemos los valores de los campos del formulario
        const idUsuario = document.getElementById("idUsuario").value;
        const libroId = document.getElementById("libroId").value;
        const fechaInicio = document.getElementById("fechaInicio").value;
        const fechaVencimiento = document.getElementById("fechaVencimiento").value;
        const estado = document.getElementById("estado").value;

        const id =Date.now().toString(35) + Math.random().toString(36).slice(2);

        await PrestamoController.agregarPrestamo(id, idUsuario, libroId, fechaInicio, fechaVencimiento, estado);
        prestamoForm.reset(); //limpiamos el formulario
        cargarPrestamos(); //actualizamos la lista de prestamos
    });

    prestamoList.addEventListener("click", async (e) =>{
        if(e.target.classList.contains("eliminar")){
            const id = e.target.getAttribute("data-id")
            await PrestamoController.eliminarPrestamo(id);
            cargarPrestamos();
        }else if(e.target.classList.contains("editar")){
            const id = e.target.getAttribute("data-id");
            // Pedir nuevos valores al usuario
            const nuevaFechaInicio = prompt("Ingrese la nueva fecha de inicio:", fechaInicio);
            const nuevaFechaVencimiento = prompt("Ingrese la nueva fecha de vencimiento:", fechaVencimiento);
            const nuevoEstado = prompt("Ingrese el nuevo estado:", estado);

            // Verificar si el usuario ingresó valores válidos
            if (nuevaFechaInicio && nuevaFechaVencimiento && nuevoEstado) {
                const datosActualizados = {
                    fechaInicio: nuevaFechaInicio,
                    fechaVencimiento: nuevaFechaVencimiento,
                    estado: nuevoEstado
                };

            await PrestamoController.actualizarPrestamo(id, datosActualizados);
            cargarPrestamos();
            }
    }
    });

    await cargarPrestamos();
});