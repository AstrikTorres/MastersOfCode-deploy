const formRegistro = document.querySelector("#formRegistro");


formRegistro.addEventListener("submit", (e) => {

    e.preventDefault();
    let selectRol = document.querySelector("[name='rol']"); 
    let selectEstado = document.querySelector("[name='estado']"); 
    let rol = selectRol.options[selectRol.selectedIndex].value;
    let estado = selectEstado.options[selectEstado.selectedIndex].value;
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const nombre = document.querySelector("#nombre");
    const telefono = document.querySelector("#telefono");

    // Comprobación y alerts para los campos
    if(email.value == '') {
        // aqui va la configuracion de un alert o span
    }
    if(password.value == '') {
        
    }
    if(nombre.value == '') {
        
    }
    if(rol == 'Selecciona tu rol:') {
        
    }
    if(estado == 'Selecciona tu estado:') {
        
    }

    // Peticion fetch
    if (email.value != '' && password.value != '' && nombre.value != '') {
    
        fetch('http://localhost:8080/users/', {
            method: "POST",
            body: JSON.stringify({
                username: email.value,
                password: password.value,
                name: nombre.value,
                ciudad: estado,
                rol: rol,
                telefono: telefono.value
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function(response) {
            if (response.status = 200) {
                alert("registro valido, ya puedes iniciar sesion");
            } else {
                alert("Favor de hacer un registro valido");
            }
        });
    }
})
