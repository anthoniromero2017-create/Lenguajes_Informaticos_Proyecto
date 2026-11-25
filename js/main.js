document.addEventListener("DOMContentLoaded", () => {
    const botonTema = document.getElementById("btn-tema");
    const htmlElement = document.documentElement;
    const claveTema = "tema-cybercity";

    function leerTema() {
        try {
            return localStorage.getItem(claveTema);
        } catch {
            return null;
        }
    }

    function guardarTema(tema) {
        try {
            localStorage.setItem(claveTema, tema);
        } catch {
            // Ignora si el almacenamiento está restringido
        }
    }

    function aplicarEstadoBoton(esOscuro) {
        if (!botonTema) return;

        botonTema.textContent = esOscuro ? "☀️ Modo Claro" : "🌙 Modo Oscuro";
        botonTema.setAttribute("aria-pressed", String(esOscuro));

        if (esOscuro) {
            botonTema.classList.replace("btn-dark", "btn-light");
        } else {
            botonTema.classList.replace("btn-light", "btn-dark");
        }
    }

    // Carga el tema guardado al abrir cualquier página
    const temaGuardado = leerTema();
    const esOscuroInicial = temaGuardado === "dark";
    htmlElement.setAttribute("data-bs-theme", esOscuroInicial ? "dark" : "light");
    aplicarEstadoBoton(esOscuroInicial);

    // Cambia el tema al hacer clic en el botón
    if (botonTema) {
        botonTema.addEventListener("click", () => {
            const esOscuroActual = htmlElement.getAttribute("data-bs-theme") === "dark";
            const siguienteEsOscuro = !esOscuroActual;
            const siguienteTema = siguienteEsOscuro ? "dark" : "light";

            htmlElement.setAttribute("data-bs-theme", siguienteTema);
            guardarTema(siguienteTema);
            aplicarEstadoBoton(siguienteEsOscuro);
        });
    }
});
