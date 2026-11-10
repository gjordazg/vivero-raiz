
// Toggle del menú hamburguesa

function toggleMenu() {
    try {
        document.getElementById("menu").classList.toggle("menu-active");
    } catch (error) {
        console.log('Error en toggle')
    }
}

function enviarMsj() {
    try {
        document.getElementById("contacto-msj").innerHTML("Mensaje enviado");
        alert("Mensaje enviado");
    } catch (error) {
        console.log('Error enviando mensaje');
    }
}