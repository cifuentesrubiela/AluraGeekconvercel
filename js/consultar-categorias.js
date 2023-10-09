import { serviciosProductos } from "../servicios/productos-servicios.js";

serviciosProductos.consultarCategorias().then((categoriasConsultadas) => {
    const selector = document.querySelector("#categoria")
    categoriasConsultadas.forEach((categoriaConsultada) => {
        const opcionCategoria = document.createElement("option");
        opcionCategoria.value = categoriaConsultada.id;
        opcionCategoria.innerHTML = categoriaConsultada.nombre;
       selector.appendChild (opcionCategoria)
    });
});
