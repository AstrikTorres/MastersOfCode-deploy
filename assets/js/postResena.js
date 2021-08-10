token = localStorage.getItem('token');
const form = document.querySelector('#form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const resumen = document.querySelector('#resumen').value;
    const opinion = document.querySelector('#opinion').value;

    // Comprobación y alerts para los campos
    if(calificacion == undefined) {
        swal({
            text: "Error, debe seleccionar una calificación",
          })  
    }
    if(resumen == '') {
        swal({
            text: "Error, debe ingresar un resumen",
          })  
    }
    if(opinion == '') {
        swal({
            text: "Error, debe ingresar una opinión",
          })   
    }

    // Peticion fetch
    if (resumen != '' && opinion != '') {
    
        fetch('https://masters-of-code-back.herokuapp.com/resenas', {
            method: "POST",
            body: JSON.stringify({
                resumen: resumen,
                opinion: opinion,
                calificacion: calificacion,
                usuarios: {
                    id: userId
                }
            }),
            headers: {
                'Authorization': token,
                'Content-Type': "application/json"
            }
        })// Recarga la pagina
        .then(response => {
            if (response.status = 200) {
                swal({
                    text: "Reseña creada con éxito",
                  })   
                location.reload();
            } else {
                swal({
                    text: "Error con el servidor, una disculpa",
                  })   
            }
        })
    }
});