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

    function obtenerTemaPreferidoSistema() {
        if (window.matchMedia) {
            return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }
        return "light";
    }

    function aplicarEstadoBoton(esOscuro) {
        if (!botonTema) return;

        botonTema.textContent = esOscuro ? "☀️ Modo Claro" : "🌙 Modo Oscuro";
        botonTema.setAttribute("aria-pressed", String(esOscuro));

        if (esOscuro) {
            botonTema.classList.remove("btn-dark");
            botonTema.classList.add("btn-light");
        } else {
            botonTema.classList.remove("btn-light");
            botonTema.classList.add("btn-dark");
        }
    }

    function aplicarTema(tema) {
        const esOscuro = tema === "dark";
        htmlElement.setAttribute("data-bs-theme", esOscuro ? "dark" : "light");
        aplicarEstadoBoton(esOscuro);
    }

    // Carga el tema guardado o la preferencia del sistema en la primera visita
    const temaGuardado = leerTema();
    const temaInicial = temaGuardado === "dark" || temaGuardado === "light"
        ? temaGuardado
        : obtenerTemaPreferidoSistema();

    aplicarTema(temaInicial);

    // Cambia el tema al hacer clic en el botón
    if (botonTema) {
        botonTema.addEventListener("click", () => {
            const esOscuroActual = htmlElement.getAttribute("data-bs-theme") === "dark";
            const siguienteTema = esOscuroActual ? "light" : "dark";

            aplicarTema(siguienteTema);
            guardarTema(siguienteTema);
        });
    }

    // Sincroniza el tema si cambia en otra pestaña del mismo sitio
    window.addEventListener("storage", (event) => {
        if (event.key === claveTema && (event.newValue === "dark" || event.newValue === "light")) {
            aplicarTema(event.newValue);
        }
    });
});
