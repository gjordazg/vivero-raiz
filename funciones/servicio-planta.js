const URL_API = "https://6ae0a63fbe3bc8fead97a7c0.mockapi.io/api/plantas";

// Pide el catálogo a la API. response.json() convierte el cuerpo en un array de objetos
async function obtenerPlantas() {
    const response = await fetch(URL_API);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
}

// Filtra planta por su ID
function obtenerPlantaPorId(plantaId) {
    const plantas = obtenerPlantas();
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

// Obtiene la planta del SesionStorage o carga desde el listado principal
function obtenerPlantaEnSesion() {
    let planta = JSON.parse(sessionStorage.getItem("planta-seleccionada"));
    if (planta === undefined) {
        const plantaId = new URLSearchParams(location.search).get("id");
        planta = obtenerPlantaPorId(plantaId);
    }
    return planta;
}


// Arma el detalle de una planta seleccionada desde el catálogo, con un template string
function crearDetalleTexto(planta) {
    return `
        <section class="detalle-planta-text">
            <h1 class="detalle-nombre">${planta.nombre}</h1>
            <p class="detalle-especie"><i>${planta.nombreCientifico}</i></p>
            <h2 class="detalle-precio">$ ${planta.precio}</h2>
            <p class="detalle-item"><strong >Luz</strong>: ${planta.luz}</p>
            <p class="detalle-item"><strong>Riego</strong>: ${planta.riego}</p>
            <p class="detalle-item"><strong>Apta Mascota</strong>: ${planta.aptaMascota == true ? "Sí" : "No"}</p>
            <p class="detalle-item"><strong >Notas</strong>: ${planta.notas}</p>
        </section>
        <section class="detalle-planta-img">
            <img class="detalle-img" src="${planta.foto}" alt="${planta.nombre}" />
            <h2 class="etiquetas">${planta.etiquetas.map(tag).join(" ")}</h2>
        </section>`;
}

function tag(etiqueta) {
    return "#"+etiqueta;
}

function renderizarDetallePlanta(planta, contenedor) {
    contenedor.innerHTML = crearDetalleTexto( planta);
}

function iniciar() {
    try {
        const planta = obtenerPlantaEnSesion();
        console.log('planta', planta);
        const element = document.getElementById("detalle-planta");
        console.log('element', element);
        renderizarDetallePlanta(planta, element);
    } catch (error) {
        console.error("No se pudo cargar el catálogo:", error);
    }
}

iniciar()