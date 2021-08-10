token = localStorage.getItem('token');
const formPublicar = document.querySelector('#formPublicar');

formPublicar.addEventListener('submit', (e) => {
    e.preventDefault();
    let selectCategoria = document.querySelector("[name='categoria']");
    let categoria = selectCategoria.options[selectCategoria.selectedIndex].value;
    const titulo = document.querySelector('#titulo').value;
    const descripcion = document.querySelector('#descripcion').value;
    const precio = document.querySelector('#precio').value;
    const imagen = document.querySelector('#imagen').value;

    // Comprobación y alerts para los campos
    if(categoria != 'Categoria:') {
        // aqui va la configuracion de un alert o span
    }
    if(titulo == '') {
            
    }
    if(descripcion == '') {
            
    }
    if(precio == '') {
            
    }

    // Peticion fetch
    if (titulo != '' && descripcion != '') {
    
        fetch('https://masters-of-code-back.herokuapp.com/proyectos', {
            method: "POST",
            body: JSON.stringify({
                titulo: titulo,
                descripcion: descripcion,
                precio: precio,
                categoria: categoria,
                imagen: imagen
            }),
            headers: {
                'Authorization': token,
                'Content-Type': "application/json"
            }
        })
    }
});
