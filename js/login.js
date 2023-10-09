
document.addEventListener("DOMContentLoaded", () => {
    const formularioLogin = document.getElementById("formularioLogin");

    if (formularioLogin) {
        formularioLogin.addEventListener("submit", async (evento) => {
            evento.preventDefault();

            const correo = document.getElementById("correo").value;
            const contrasena = document.getElementById("contrasena").value;

            try {
                const respuesta = await fetch(`https://servidor-alura-geeksimulado.vercel.app/usuarios?correo=${correo}&contrasena=${contrasena}`);
                const usuarios = await respuesta.json();

                if (usuarios.length > 0) {
                    // Autenticación exitosa
                    alert("Inicio de sesión exitoso");

                    // Obtener el rol del usuario autenticado
                    const userRole = usuarios[0].rol;

                    // Almacenar el rol en el almacenamiento local
                    localStorage.setItem("userRole", userRole);

                    // Cambiar la URL actual para evitar el retroceso del navegador
                    history.pushState(null, null, "admin.html");

                    // Mostrar el botón para regresar al index.html si existe
                    const backButton = document.getElementById("back-to-index");
                    if (backButton) {
                        backButton.style.display = "block";
                        backButton.addEventListener("click", () => {
                            // Redirigir al index.html
                            window.location.href = "index.html";
                        });
                    }

                    // Redirigir a la página todoslosproductos.html
                    window.location.href = "todoslosproductos.html";
                } else {
                   
                    alert("Credenciales incorrectas");
                }
            } catch (error) {
                console.error("Error al procesar la solicitud:", error);
            }
        });
    }
});
