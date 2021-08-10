token = localStorage.getItem('token');
const form = document.querySelector('#form');
    
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let selectPresupuesto = document.querySelector("[name='presupuesto']");
    let presupuesto = selectPresupuesto.options[selectPresupuesto.selectedIndex].value;
    const titulo = document.querySelector('#titulo').value;
    const descripcion = document.querySelector('#descripcion').value;

    // Comprobación y alerts para los campos
    if(presupuesto == '') {
        alert('Por favor seleccione el presupuesto');
    }
    if(titulo == '') {
        alert('Por favor introduzca el título'); 
    }
    if(descripcion == '') {
        alert('Por favor introduzca la descripción'); 
    }

    // Peticion fetch
    if (titulo != '' && descripcion != '') {
            
        fetch('https://masters-of-code-back.herokuapp.com/solicitudes', {
            method: "POST",
            body: JSON.stringify({
                nombre: titulo,
                descripcion: descripcion,
                presupuesto: presupuesto,
                usuarios: {
                    id: userId
                }
            }),
            headers: {
                'Authorization': token,
                'Content-Type': "application/json"
            }
        }).then(response => {
            if (response.status = 200) {
                alert('Solicitud añadida con exito');
                location.reload();
            } else {
                alert('Error con el servidor, una disculpa');
            }
        })
    }
});