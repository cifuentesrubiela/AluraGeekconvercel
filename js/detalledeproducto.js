
import { serviciosProductos } from "../servicios/productos-servicios.js";

const agregarAlCarrito = (producto) => {
    const carritoData = {
        id: producto.id,
        urlImagen: producto.urlImagen,
        nombre: producto.nombre,
        precio: producto.precio,
        categoriaId: producto.categoriaId,
    };

    fetch("https://servidor-alura-geeksimulado.vercel.app/carrito", {
        method: "POST",
        body: JSON.stringify(carritoData),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((respuesta) => respuesta.json())
        .then((carritoActualizado) => {
            console.log("Producto agregado al carrito:", producto);
            // Resto del código para mostrar la ventana modal de éxito
            Swal.fire({
                title: "Producto agregado al carrito",
                text: "El producto ha sido agregado al carrito de compras.",
                icon: "success",
                confirmButtonText: "Aceptar",
            });

            // Redirigir a la página "detalledeproducto.html" después de agregar al carrito
            window.location.href = "detalle-producto.html?id=" + producto.id;
        })
        .catch((error) => {
            console.error("Error:", error);
            // Muestra un SweetAlert para indicar que ha ocurrido un error al agregar el producto al carrito.
            Swal.fire({
                title: "Error",
                text: "Ha ocurrido un error al agregar el producto al carrito.",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        });
};


document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    console.log("Product ID:", productId);
    if (productId) {
      console.log("Product ID:", productId);

    serviciosProductos
        .consultarProductoPorId(productId)
        .then((producto) => {
          console.log("Producto obtenido:", producto);
          const detalleProducto = document.createElement("div");
            detalleProducto.classList.add("detalle-producto");
            detalleProducto.innerHTML = `
                    <img
                        src="${producto.urlImagen}"
                        alt="${producto.nombre}"
                        class="product-image"
                    />
                    <div class="product-info">
                        <h1>${producto.nombre}</h1>
                        <p>${producto.descripcion}</p>
                        <div class="product-price">$ ${producto.precio}</div>
                        <button id="agregar-carrito" class="agregar-al-carrito-btn">
                            <i class="fas fa-cart-plus"></i> Agregar al carrito
                        </button>
                    </div>
                  `;
            const mainContent = document.querySelector(".producto-card");
            mainContent.appendChild(detalleProducto);

            // Obtiene el botón de "Agregar al carrito" por su ID
            const agregarCarritoButton =
                document.getElementById("agregar-carrito");

            // Event listener para el botón "Agregar al carrito"
            agregarCarritoButton.addEventListener("click", () => {
                agregarAlCarrito(producto);
            });
        })

        .catch((error) => {
            console.error("Error:", error);
            // Muestra un SweetAlert para indicar que ha ocurrido un error al obtener el producto.
            Swal.fire({
                title: "Error",
                text: "Ha ocurrido un error al obtener el producto.",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        });
      } else {
        console.error("ID de producto no proporcionado en la URL.");
    }
});
