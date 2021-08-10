token = localStorage.getItem('token');
const formEmpleo = document.querySelector('#formEmpleo');
formEmpleo.addEventListener('submit', (e) => {
    e.preventDefault();
    const puesto = document.querySelector('#puesto').value;
    const empresa = document.querySelector('#empresa').value;
    const descripcion = document.querySelector('#descripcion').value;

    // Comprobación y alerts para los campos
    if(descripcion == '') {
        alert('Debe seleccionar una calificación');
    }
    if(puesto == '') {
        alert('Debe introducir un puesto');
    }
    if(empresa == '') {
        alert('Debe introducir una empresa');
    }

    // Peticion fetch
    if (puesto != '' && empresa != '') {
    
        fetch('https://masters-of-code-back.herokuapp.com/experiencia', {
            method: "POST",
            body: JSON.stringify({
                puesto: puesto,
                empresa: empresa,
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