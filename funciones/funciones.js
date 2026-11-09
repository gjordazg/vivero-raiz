
// Toggle del menú hamburguesa

function toggleMenu() {
    try {
        document.getElementById("menu").classList.toggle("menu-active");
    } catch (error) {
        console.log('Error en toggle')
    }
}