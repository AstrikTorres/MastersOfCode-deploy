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
        swal({
            text: "El campo email no puede estar vacio",
          })   
    }
    if(password.value == '') {
        swal({
            text: "El campo password no puede estar vacio",
          }) 
    }
    if(nombre.value == '') {
        swal({
            text: "El campo nombre no puede estar vacio",
          }) 
    }
    if(rol == 'Selecciona tu rol:') {
        swal({
            text: "Selecciona tu rol",
          }) 
    }
    if(estado == 'Selecciona tu estado:') {
        swal({
            text: "Selecciona tu estado",
          }) 
    }

    // Peticion fetch
    if (email.value != '' && password.value != '' && nombre.value != '') {
    
        fetch('https://masters-of-code-back.herokuapp.com/users/', {
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
                swal({
                    text: "Registro válido, ya puedes iniciar sesión",
                  }) 
                location.href = "login.html";
            } else {
                swal({
                    text: "Favor de hacer un registro válido",
                  }) 
            }
        });
    }
})
