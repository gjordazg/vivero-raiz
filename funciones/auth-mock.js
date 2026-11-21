const usuarios = [
    {
        user: "admin",
        pwd: "1234"
    },
    {
        user: "hernandezj",
        pwd: "vivero2026"
    },
    {
        user: "ordazg",
        pwd: "vivero2022"
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
