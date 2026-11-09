const usuarios = [
    {
        user: "admin",
        pwd: "Admin1234%"
    },
    {
        user: "juan2026",
        pwd: "juaN123!"
    },
    {
        user: "maria2022",
        pwd: "maRia$123"
    }
];


document
    .getElementById("loginForm")
    .addEventListener("submit", login);

function login(event) {

    event.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;

    const encontrado = usuarios.find(u =>
        u.user === usuario &&
        u.pwd === password
    );

    if (!encontrado) {

        document.getElementById("login-error").textContent =
            "El correo o la contraseña no coinciden. Probá de nuevo.";

        return;
    }

    localStorage.setItem("adminLogueado", "true");

    window.location.href = "catalogo.html";
}