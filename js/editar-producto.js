
import { serviciosProductos } from "../servicios/productos-servicios.js";

const urlParams = new URLSearchParams(window.location.search);
const productoId = urlParams.get("id");

const urlInput = document.getElementById("urlInput");
const categoriaSelect = document.getElementById("categoria");
const nombreInput = document.querySelector(".nombre_producto");
const precioInput = document.querySelector(".precio_producto");
const descripcionInput = document.querySelector(".descripcion_producto");
const editarProductoForm = document.querySelector(".datos_agregar_producto");

const mostrarMensajeExitoso = (mensaje) => {
  Swal.fire({
    icon: "success",
    title: mensaje,
    showConfirmButton: false,
    timer: 1500,
  });
};

const mostrarMensajeError = (mensaje) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: mensaje,
  });
};

(async () => {
  try {
    const producto = await serviciosProductos.consultarProductoPorId(productoId);
    urlInput.value = producto.urlImagen;
    nombreInput.value = producto.nombre;
    precioInput.value = producto.precio;
    descripcionInput.value = producto.descripcion;

    const categorias = await serviciosProductos.consultarCategorias();
    categorias.forEach((categoria) => {
      const option = document.createElement("option");
      option.value = categoria.id;
      option.textContent = categoria.nombre;
      if (categoria.id === producto.categoriaId) {
        option.selected = true;
      }
      categoriaSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error al obtener el producto por ID:", error);
  }
})();

editarProductoForm.onsubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData(editarProductoForm);
  const productoEditado = {
    urlImagen: formData.get("urlImagen"),
    categoriaId: Number(formData.get("categoriaId")), 
    nombre: formData.get("nombre"),
    precio: formData.get("precio"),
    descripcion: formData.get("descripcion"),
  };

  try {
    const productoActualizado = await serviciosProductos.editarProducto(
      productoId,
      productoEditado
    );
    console.log("Producto editado:", productoActualizado);
    mostrarMensajeExitoso("Producto editado correctamente");
    window.location.href = `todoslosproductos.html?id=${productoActualizado.id}`;
  } catch (error) {
    console.error("Error al editar el producto:", error);
    mostrarMensajeError("Error al editar el producto");
  }
};
