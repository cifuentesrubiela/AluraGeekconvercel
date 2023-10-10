import { serviciosProductos } from "../servicios/productos-servicios.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const categorias = await serviciosProductos.consultarProductos();
    const slidesToShow = 5; // Mostrar 5 tarjetas a la vez

    categorias.forEach((categoria) => {
      const categoriaContainer = document.createElement("div");
      categoriaContainer.classList.add("categoria");

      const tituloCategoria = document.createElement("h2");
      tituloCategoria.classList.add("titulos-categoria");
      tituloCategoria.textContent = categoria.nombre;
      categoriaContainer.appendChild(tituloCategoria);

      const slideshowContainer = document.createElement("div");
      slideshowContainer.classList.add("slideshow-container");

      const slides = categoria.productos.map((producto) =>
        crearTarjetaDeProducto(producto)
      );

      let currentIndex = 0;

      function showSlides(index) {
        slides.forEach((slide, slideIndex) => {
          slide.style.display = slideIndex >= index && slideIndex < index + slidesToShow ? "block" : "none";
        });
      }

      showSlides(currentIndex);

      const prevButton = document.createElement("button");
      prevButton.classList.add("prev-button");
      prevButton.textContent = "Anterior";
      prevButton.addEventListener("click", () => {
        if (currentIndex > 0) {
          currentIndex--;
          showSlides(currentIndex);
        }
      });

      const nextButton = document.createElement("button");
      nextButton.classList.add("next-button");
      nextButton.textContent = "Siguiente";
      nextButton.addEventListener("click", () => {
        if (currentIndex < slides.length - slidesToShow) {
          currentIndex++;
          showSlides(currentIndex);
        }
      });

      const verTodoDiv = document.createElement("div");
      verTodoDiv.classList.add("ver-todo");

      const verTodoImg = document.createElement("img");
      verTodoImg.src = "./img/arrow.svg";
      verTodoImg.alt = "Ver Todo";
      verTodoDiv.appendChild(verTodoImg);

      const verTodoP = document.createElement("p");
      verTodoP.textContent = "Ver Todo";
      verTodoDiv.appendChild(verTodoP);

      verTodoDiv.addEventListener("click", () => {
        window.location.href = "todoslosproductos.html";
      });

      categoriaContainer.appendChild(verTodoDiv);
      categoriaContainer.appendChild(slideshowContainer);
      categoriaContainer.appendChild(prevButton);
      categoriaContainer.appendChild(nextButton);

      // Inicializar el carrusel
      const slidesContainer = document.createElement("div");
slidesContainer.classList.add("slides-container");
slideshowContainer.appendChild(slidesContainer);

slides.forEach((slide) => {
  slide.style.flex = `0 0 calc(100% / ${slidesToShow})`;
  slidesContainer.appendChild(slide);
});

      // Agregar la categoría al contenedor principal
      const mainContainer = document.querySelector(".categorias");
      mainContainer.appendChild(categoriaContainer);
    });

  } catch (error) {
    console.error("Error al obtener los datos de los productos:", error);
  }
});

function crearTarjetaDeProducto(producto) {
  const tarjetaProducto = document.createElement("div");
  tarjetaProducto.classList.add("product-card");
  tarjetaProducto.innerHTML = `
    <a href="detalle-producto.html?id=${producto.id}" class="product-link">
        <img
            src="${producto.urlImagen}"
            alt="${producto.nombre}"
            class="product-image"
        />
        <div class="product-name">${producto.nombre}</div>
        <div class="product-price">${producto.precio}</div>
        Ver detalle</a>
    `;
  return tarjetaProducto;
}

// Crear el botón "Login"
const loginButton = document.createElement("button");
loginButton.textContent = "Login";
loginButton.classList.add("login-btn"); // Agregar la clase "login-btn" para estilos

// Agregar un evento de clic al botón para redirigir a login.html
loginButton.addEventListener("click", () => {
  window.location.href = "login.html"; // Redirigir a la página de inicio de sesión
});

// Obtener el contenedor donde deseas agregar el botón (puedes reemplazar ".nav" con el selector adecuado)
const navContainer = document.querySelector(".barranavegacion");

// Agregar el botón al contenedor
navContainer.appendChild(loginButton);

