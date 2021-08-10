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
        // aqui va la configuracion de un alert o span
    }
    if(titulo == '') {
            
    }
    if(descripcion == '') {
            
    }

    // Peticion fetch
    if (titulo != '' && descripcion != '') {
            
        fetch('http://localhost:8080/solicitudes', {
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
        })
    }
});