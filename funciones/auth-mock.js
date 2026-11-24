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

/* ===========================
    Validaciones y funciones
    del ingreso:
=========================== */

const form = document.getElementById("loginForm");
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
        errorDiv.textContent = "El usuario o la contraseña son incorrectos.";
        return;
    }

    sessionStorage.setItem("adminLogueado", "true");
    window.location.href = "catalogo.html";
}


/* ===========================
    Validaciones y funciones
    del registro:
=========================== */

const regexTexto = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
const regexNumero = /^\d+$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPassword = /^[a-zA-Z0-9]{6,10}$/;

// obtenemos y validamos el nombre
const nombre = document.getElementById("fname");
nombre.addEventListener("blur", () => {
        validarNombre();
    });

function validarNombre() {
    if (esNombreApellidoValido(nombre.value.trim())) {
        limpiarError(nombre);
        nombre.classList.remove("campo-error");
        nombre.classList.add("campo-ok");
    } else {
        nombre.classList.remove("campo-ok");
        mostrarError(nombre, "¡El nombre no es válido!");
        nombre.classList.add("campo-error");
    }
}

// obtenemos y validamos el apellido
const apellido = document.getElementById("lname");
apellido.addEventListener("blur", () => {
        validarApellido();
    });

// obtenemos y validamos el telefono
const telefono = document.getElementById("phone");
telefono.addEventListener("blur", () => {
        validarTelefono();
    });

// obtenemos y validamos la fecha de nacimiento
const fechaNac = document.getElementById("bdate");
fechaNac.addEventListener("blur", () => {
        validarFechaNacimiento()
    });

// obtenemos y validamos el email
const email = document.getElementById("email");
email.addEventListener("blur", () => {
        validarEmail();
    });

// obtenemos y validamos el rol
const rol = document.getElementById("roles");
rol.addEventListener("blur", () => {
        validarRol();
    });

// obtenemos y validamos la 1ra password
const pwd1 = document.getElementById("pwd1");
pwd1.addEventListener("blur", () => {
        validarPwd1();
    });

// obtenemos y validamos la segunda password
const pwd2 = document.getElementById("pwd2");
pwd2.addEventListener("blur", () => {
        validarPwd2();
    });
   

function mostrarError(element, mensaje) {
    element.textContent = mensaje;
}

function limpiarError(element) {
    element.textContent = "";
}

function esNombreApellidoValido(nombreApellido) {
    return regexTexto.test(nombreApellido);
}

function esTelefonoValido(telefono) {
    return regexNumero.test(telefono);    
}

function esEmailValido(email) {
    return regexEmail.test(email);    
}

function esPasswordValida(password) {
    regexPassword.test(password);    
}


function esMayorEdad(fecha) {
    
    const hoy = new Date();
    const nacimiento = new Date(fecha);

    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || 
        (mes === 0 
            && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }

    return edad >= 18;
}

