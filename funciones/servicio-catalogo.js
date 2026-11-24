const URL_API = "https://6ae0a63fbe3bc8fead97a7c0.mockapi.io/api/plantas";

// Pide el catálogo a la API. response.json() convierte el cuerpo en un array de objetos
async function obtenerPlantas() {
    const response = await fetch(URL_API);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
}

// Obtiene las plantas del SesionStorage o consulta a la api
function obtenerPlantasEnSesion() {
    let plantas = JSON.parse(sessionStorage.getItem("plantas-api"));

    console.log(plantas);
    if (plantas === null || plantas === undefined || plantas.length === 0) {
        plantas = obtenerPlantas();
    }
    return plantas
}

// Obtiene detalle de la planta seleccionada, guarda en el SesionStorage y redirige al detalle.
function verFichaPlanta(plantaId) {
    const planta = obtenerPlantaPorId(plantaId);
    sessionStorage.setItem("planta-seleccionada", JSON.stringify(planta));
    window.location.href = "planta.html?id=" + plantaId;
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


function debounce(callback, delay = 300) {
    let timeout;

    return (...args) => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            callback(...args);
        }, delay);
    };
}

// bounce para iniciar la búsqueda
const buscar = debounce(() => {

    let texto = inputBuscar.value.trim();
    let categoria = tipoPlanta.value.trim();

    let esTextoVacio = texto === null || texto === undefined || texto.length ===0;

    console.log("entra en buscar...", texto, categoria)
    const plantas = obtenerPlantasEnSesion();
    let filtrados = null;
    if (categoria !== "todas" && esTextoVacio) {
        filtrados = plantas.filter(planta => 
            planta.categoria.toLowerCase().includes(categoria.toLowerCase())
        );
    } else if (categoria !== "todas" && !esTextoVacio) {
        filtrados = plantas.filter(
            planta => 
                planta.categoria.toLowerCase().includes(categoria.toLowerCase())
                && Object.values(planta).some(
                    valor =>
                    String(valor)
                        .toLowerCase()
                        .includes(texto.toLowerCase())
                    )
        );
    } else if (categoria === "todas" && !esTextoVacio) {
        filtrados = plantas.filter(planta => 
            Object.values(planta).some(valor =>
                    String(valor)
                        .toLowerCase()
                        .includes(texto.toLowerCase())
                    )
        );
    }
    else {
        filtrados = plantas;
    }

    console.log("filtrado:", filtrados, "es diferente:", filtrados!==plantas)

    renderizarCatalogoTexto(filtrados, resultado);
}, 300);


// Valor del input y el selector
const inputBuscar = document.getElementById("buscar-planta");
const tipoPlanta = document.getElementById("tipo-planta");

inputBuscar.addEventListener("input", buscar);
tipoPlanta.addEventListener("change", buscar); 

//====================

// Validamos una sesión activa
function validarSesion() {
    const adminLogueado = sessionStorage.getItem("adminLogueado");
    toogleBtnIrListado(adminLogueado === "true" ? "block" : "none");
}

// Se muestra u oculta botón de redirección al listado.
function toogleBtnIrListado(styleValue) {
    const elements = document.getElementsByClassName("stock");
    for (i = 0; i < elements.length; i++) {
        elements[i].style.display = styleValue;
    }
    document.getElementById("btn-stock").style.display = styleValue;
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
                <p class="stock">Stock: ${planta.stock}</p>
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

// Contenedor para renderizar
const resultado = document.getElementById("catalogo-container");

// Se obtienen las plantas de sesión (o API) y se renderiza
async function iniciar() {
    try {
        const plantas = await obtenerPlantasEnSesion();
        renderizarCatalogoTexto(plantas, resultado);
        sessionStorage.setItem("plantas-api", JSON.stringify(plantas));
        validarSesion();
    } catch (error) {
        console.error("No se pudo cargar el catálogo:", error);
    }
}

iniciar();
