import { serviciosProductos } from "../servicios/productos-servicios.js";

const formulario = document.querySelector(".datos_agregar_producto");
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const datosFormulario = new FormData(evento.target);
  const productoACrear = Object.fromEntries(datosFormulario);
  productoACrear.categoriaId = Number(productoACrear.categoriaId);

  Swal.fire({
   
    text: "¿Deseas agregar este producto?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#2A7AE4',
    confirmButtonText: 'Sí',
    cancelButtonColor: '#d33',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        text: 'El producto ha sido agregado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
      // Si el usuario responde "Sí", agrega el producto utilizando el servicio
      serviciosProductos.crearProducto(productoACrear)
        .then(() => {
          // Muestra un SweetAlert para indicar que el producto ha sido agregado exitosamente
     
            // Redirige a la página que muestra la lista de productos (index.html)
            window.location.href = "index.html";
          }).catch((error) => {
          console.error('Error:', error);
          // Muestra un SweetAlert para indicar que ha ocurrido un error al agregar el producto.
          Swal.fire({
            title: 'Error',
            text: 'Ha ocurrido un error al agregar el producto.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        });
    }
  });
});

