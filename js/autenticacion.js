
export function cerrarSesion() {
    localStorage.removeItem("userRole");
    window.location.href = "index.html";
}

