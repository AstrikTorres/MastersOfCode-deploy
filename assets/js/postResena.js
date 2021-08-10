token = localStorage.getItem('token');
const form = document.querySelector('#form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const resumen = document.querySelector('#resumen').value;
    const opinion = document.querySelector('#opinion').value;

    // Comprobación y alerts para los campos
    if(calificacion == undefined) {
        alert('Debe seleccionar una calificación');
    }
    if(resumen == '') {
        alert('Debe introducir un resumen');
    }
    if(opinion == '') {
        alert('Debe introducir una opinion');
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
                alert('Reseña creada con exito');
                location.reload();
            } else {
                alert('Error con el servidor, una disculpa');
            }
        })
    }
});