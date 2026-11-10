const URL_API = "https://6ae0a63fbe3bc8fead97a7c0.mockapi.io/api/plantas";

// Pide el catálogo a la API. response.json() convierte el cuerpo en un array de objetos
async function obtenerPlantas() {
    const response = await fetch(URL_API);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
}

// Obtiene detalle de la planta seleccionada, guarda en el SesionStorage y redirige al detalle.
function verFichaPlanta(plantaId) {
    const planta = obtenerPlantaPorId(plantaId);
    sessionStorage.setItem("planta-seleccionada", JSON.stringify(planta));
    window.location.href = "planta.html?id="+plantaId;
}

// Filtra planta por su ID
function obtenerPlantaPorId(plantaId) {
    const plantas = obtenerPlantasEnSesion();
    let plantaSeleccionada; 
    plantas.forEach(planta => {
            if (planta.id === plantaId) plantaSeleccionada = planta;
        });
    return plantaSeleccionada;
}

// Obtiene las plantas del SesionStorage o consulta a la api
function obtenerPlantasEnSesion() {
    let plantas = JSON.parse(sessionStorage.getItem("plantas"));
    if (plantas === undefined) {
        plantas = obtenerPlantas();
    }
    return plantas
}

// Arma la tarjeta informativa de una planta para el catálogo, con un template string
function crearTarjetaTexto(planta) {
    return `
        <section class="catalogo-card">
            <img class="catalogo-img" src="${planta.foto}" alt="${planta.nombre}" />
            <hr />
            <div class="catalogo-info">
                <h3 class="planta-nombre">${planta.nombre}</h3>
                <p class="especie"><i>${planta.nombreCientifico}</i></p>
                <h2 class="precio">$ ${planta.precio}</h2> 
                <button class="planta-btn" onclick="verFichaPlanta(${planta.id})">
                    Ver ficha
                </button>
            </div>
        </section>`;
}

// Junta todos los textos y el navegador los convierte en elementos
function renderizarCatalogoTexto(plantas, contenedor) {
    contenedor.innerHTML = plantas.map(crearTarjetaTexto).join("");
}

// Espera la respuesta de la API antes de renderizar
async function iniciar() {
    try {
        const plantas = await obtenerPlantas();
        renderizarCatalogoTexto(plantas, document.getElementById("catalogo-container"));
        sessionStorage.setItem( "plantas", JSON.stringify(plantas));
    } catch (error) {
        console.error("No se pudo cargar el catálogo:", error);
    }
}

iniciar();