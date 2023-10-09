
const handleError = (error) => {
  console.error("Error:", error);
  throw new Error("Ha ocurrido un error. Por favor, inténtalo nuevamente más tarde.");
};

  
  const consultarProductos = () => {
    return fetch("https://servidor-alura-geeksimulado.vercel.app/categorias?_embed=productos")
      .then((respuesta) => respuesta.json())
      .catch(handleError);
  };
  
  const consultarCategorias = () => {
    return fetch("https://servidor-alura-geeksimulado.vercel.app/categorias")
      .then((respuesta) => respuesta.json())
      .catch(handleError);
  };
  
  const crearProducto = (producto) => {
    return fetch("https://servidor-alura-geeksimulado.vercel.app/productos", {
      method: "POST",
      body: JSON.stringify(producto),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((respuesta) => respuesta.json())
      .catch(handleError);
  };
  
  const editarProducto = (id, producto) => {
    return fetch(`https://servidor-alura-geeksimulado.vercel.app/productos/${id}`, {
      method: "PUT",
      body: JSON.stringify(producto),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((respuesta) => respuesta.json())
      .catch(handleError);
  };
  
  const consultarProductoPorId = (id) => {
    return fetch(`https://servidor-alura-geeksimulado.vercel.app/productos/${id}`)
      .then((respuesta) => respuesta.json())
      .catch(handleError);
  };
  const eliminarProducto = (id) => {
    return fetch(`https://servidor-alura-geeksimulado.vercel.app/productos/${id}`, {
      method: "DELETE",
    
  })
  };
  
  export const serviciosProductos = {
    consultarProductos,
    consultarCategorias,
    crearProducto,
    editarProducto,
    consultarProductoPorId,
    eliminarProducto,
  };
  

  
  


