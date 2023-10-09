import { serviciosProductos } from "../servicios/productos-servicios.js";
import { cerrarSesion } from "./autenticacion.js";

document.addEventListener("DOMContentLoaded", async () => {
    const userRole = localStorage.getItem("userRole");
    const addButton = document.querySelector(".agregarproductos-btn");
    const editButtons = document.querySelectorAll(".edit-icon");
    const deleteButtons = document.querySelectorAll(".delete-icon");
    const productCards = document.querySelectorAll(".product-card");

    if (userRole !== "admin") {
        addButton.style.display = "none";
        editButtons.forEach(button => button.style.display = "none");
        deleteButtons.forEach(button => button.style.display = "none");
    } else {
        productCards.forEach(card => card.style.display = "none");
    }

    try {
        const categorias = await serviciosProductos.consultarProductos();

        const productContainer = document.createElement("div");
        productContainer.classList.add("product-container");

        categorias.forEach(categoria => {
            categoria.productos.forEach(producto => {
                const tarjetaProducto = createProductCard(producto);
                productContainer.appendChild(tarjetaProducto);
            });
        });

        const footer = document.querySelector("footer");
        document.querySelector("body").insertBefore(productContainer, footer);
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
});

function createProductCard(producto) {
    const tarjetaProducto = document.createElement("div");
    tarjetaProducto.classList.add("product-card");
    tarjetaProducto.innerHTML = `
        <img src="${producto.urlImagen}" alt="${producto.nombre}" class="product-image" />
        <div class="product-name">${producto.nombre}</div>
        <div class="product-price">${producto.precio}</div>
        <div class="product-actions">
            
            <a href="detalle-producto.html?id=${producto.id}" class="product-link">Ver detalle</a>
            ${localStorage.getItem("userRole") === "admin" ? `<i class="fas fa-edit edit-icon" title="Editar" onclick="enviarProducto(${producto.id})"></i>` : ''}
            ${localStorage.getItem("userRole") === "admin" ? `<i class="fas fa-trash-alt delete-icon" title="Eliminar" data-id="${producto.id}"></i>` : ''}
        </div>
    `;

    const deleteIcon = tarjetaProducto.querySelector(".delete-icon");
    deleteIcon?.addEventListener("click", () => confirmarEliminacion(producto.id, tarjetaProducto));

    return tarjetaProducto;
}

function confirmarEliminacion(idProducto, tarjetaProducto) {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "El producto será eliminado permanentemente",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    }).then(result => {
        if (result.isConfirmed) {
            eliminarProducto(idProducto, tarjetaProducto);
        }
    });
}

function eliminarProducto(idProducto, tarjetaProducto) {
    serviciosProductos.eliminarProducto(idProducto)
        .then(() => {
            tarjetaProducto.remove();
            Swal.fire("¡Eliminado!", "El producto ha sido eliminado.", "success");
        })
        .catch(error => {
            console.error("Error al eliminar el producto:", error);
            Swal.fire("¡Error!", "Ha ocurrido un error al eliminar el producto.", "error");
        });
}

function enviarProducto(idProducto) {
    window.location.href = `editarproducto.html?id=${idProducto}`;
}
// En algún lugar, como en un botón de "Cerrar Sesión"
const botonCerrarSesion = document.getElementById("cerrar-sesion");

botonCerrarSesion.addEventListener("click", () => {
    cerrarSesion();
});
