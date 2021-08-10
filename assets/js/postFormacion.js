token = localStorage.getItem('token');
const formEducacion = document.querySelector('#formEducacion');
formEducacion.addEventListener('submit', (e) => {
    e.preventDefault();
    const gradoAcademico = document.querySelector('#grado').value;
    const institucion = document.querySelector('#institucion').value;
    const descripcion = document.querySelector('#titulo').value;

    // Comprobación y alerts para los campos
    if(descripcion == '') {
        alert('Debe seleccionar una calificación');
    }
    if(gradoAcademico == '') {
        alert('Debe introducir un gradoAcademico');
    }
    if(institucion == '') {
        alert('Debe introducir una institucion');
    }

    // Peticion fetch
    if (gradoAcademico != '' && institucion != '') {
    
        fetch('https://masters-of-code-back.herokuapp.com/educacion', {
            method: "POST",
            body: JSON.stringify({
                gradoAcademico: gradoAcademico,
                institucion: institucion,
                descripcion: descripcion,
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
                alert('Experiencia guardada con exito');
            } else {
                alert('Error con el servidor, una disculpa');
            }
        })
    }
});