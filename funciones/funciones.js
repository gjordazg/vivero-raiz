
// Toggle del menú hamburguesa
const hamburger = document.getElementById('hamburger');
const menu = document.getElementsByClassName('cabecera-options');

hamburger.addEventListener('click', () => {
    menu.classList.toggle('active');
});

