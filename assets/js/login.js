const formLogin = document.querySelector("#formLogin");

formLogin.addEventListener("submit", (e) => {

    e.preventDefault();
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");

    if(email.value == '') {
        swal({
            text: "Ingresa tu email",
          })
    }

    if(password.value == '') {
        swal({
            text: "Ingresa tu contraseña",
          })
    }

    if (email.value != '' && password.value != '') {
    
        fetch('http://localhost:8080/login', {
            method: "POST",
            body: JSON.stringify({
                username: email.value,
                password: password.value
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(resp => {
            token = resp.headers.get("Authorization");

            if (token && token.includes('Bearer')) {
                console.log(token);
                localStorage.setItem("token", token);
                /* window.location.href = "succes.html"; */
                url = window.location;
                const path = url.pathname.substring(0, url.pathname.lastIndexOf('/') + 1);

                location.href = path + "mi-perfil.html";
            } else {
                localStorage.removeItem("token");  
                swal({
                    text: "Error, favor de ingresar un email y un password validos",
                  })          
            }
            
        })
    }
})

token = localStorage.getItem('token');

if (token) {
    url = window.location;
    const path = url.pathname.substring(0, url.pathname.lastIndexOf('/') + 1);
    location.href = path + "perfil.html";

}
