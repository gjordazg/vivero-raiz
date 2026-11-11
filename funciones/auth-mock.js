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

const form = document.getElementById("loginForm");

console.log('form',form);

form.addEventListener("submit", ingresar);

function ingresar(event) {

    event.preventDefault();

    console.log('event', event);
    
    const user = document.getElementById("user").value.trim();
    const pwd = document.getElementById("pwd").value;

    const errorDiv = document.getElementById("login-error");

    errorDiv.style.display = "none";
    errorDiv.textContent = "";

    const loginValido = usuarios.some(u =>
        u.user === user &&
        u.pwd === pwd
    );

    if (!loginValido) {

        errorDiv.style.display = "block";
        errorDiv.textContent =
            "El usuario o la contraseña son incorrectos.";

        return;
    }

    localStorage.setItem("adminLogueado", "true");

    window.location.href = "catalogo.html";
}
