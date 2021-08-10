//FUNCION CARRITO DE COMPRAS

window.onload = function () {
    // Variables
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Mockup Responsivo',
            precio: 100,
            imagen: 'assets/img/tech/PRO.png'
        },
        {
            id: 2,
            nombre: 'Pagina web',
            precio: 450,
            imagen: 'assets/img/tech/PRO4.png'
        },
        {
            id: 3,
            nombre: 'Pagina web responsiva',
            precio: 800,
            imagen: 'assets/img/tech/PRO2.png'
        },
        {
            id: 4,
            nombre: 'Pagina Web',
            precio: 560,
            imagen: 'assets/img/tech/PRO4.png'
        },
        {
            id: 5,
            nombre: 'App Android',
            precio: 1200,
            imagen: 'assets/img/tech/PRO3.png'
        },
        {
            id: 6,
            nombre: 'Pagina web responsiva',
            precio: 800,
            imagen: 'assets/img/tech/proyecto4.jpg'
        },
        {
            id: 7,
            nombre: 'Mockup Responsivo',
            precio: 320,
            imagen: 'assets/img/tech/proyecto8.jpg'
        },
        {
            id: 8,
            nombre: 'Pagina web',
            precio: 950,
            imagen: 'assets/img/tech/proyecto9.jpg'
        },
        {
            id: 9,
            nombre: 'Pagina web responsiva',
            precio: 1800,
            imagen: 'assets/img/tech/proyecto7.jpg'
        },
      

    ];

    let a = 0;
    let carrito = [];
    let total = 0;
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const miLocalStorage = window.localStorage;

    // Funciones
    function loadCarrito() {
        
    const carritoLocalStorage = JSON.parse(localStorage.getItem('carrito')) || [];
        
       /*  console.log(carritoLocalStorage); */

        carritoLocalStorage.forEach(elemento => {
            carrito.push(elemento);
            calcularTotal();
            // Actualizamos el carrito 
            renderizarCarrito();
            // Actualizamos el LocalStorage
            guardarCarritoEnLocalStorage();
            // agregar cantidad a carrito
            addNumCompras(); 
        });
    }
    loadCarrito();
    /**
    * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
    */
    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
            // Estructura
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            // Body
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            const miNodoTitle = document.createElement('h6');
            miNodoTitle.classList.add('card-title','mt-3');
            miNodoTitle.textContent = info.nombre;
            // Imagen
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.imagen);
            // Precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent =  '$' +info.precio ;
            // Boton 
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-dark');
            miNodoBoton.textContent = '+ Agregar';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', anadirProductoAlCarrito);
            // Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }

    /**
    * Evento para añadir un producto al carrito de la compra
    */
    function anadirProductoAlCarrito(evento) {
       
       const containCarrito = carrito.includes(evento.target.getAttribute('marcador'));
       console.log(containCarrito);
        // Añadimos el Nodo a nuestro carrito
        if(!containCarrito){
            carrito.push(evento.target.getAttribute('marcador'));   
            // Calculo el total
            calcularTotal();
            // Actualizamos el carrito 
            renderizarCarrito();
            // Actualizamos el LocalStorage
            guardarCarritoEnLocalStorage();
            // agregar cantidad a carrito
            addNumCompras();
        } else {

            swal({
                text: "Este producto ya fue seleccionado",
              })
 main
        }
        console.log(carrito);
       
    }

   

    function addNumCompras(rest = false){

        if(rest){
            a = a -1;
        }else{
            a = a + 1;
        }
        
        document.getElementById("sum").innerHTML = a;
    }

    /**
    * Dibuja todos los productos guardados en el carrito
    */
    function renderizarCarrito() {
        // Vaciamos todo el html
        DOMcarrito.textContent = '';
        // Quitamos los duplicados
        const carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach((item) => {
            // Obtenemos el item que necesitamos de la variable base de datos
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                // ¿Coincide las id? Solo puede existir un caso
                return itemBaseDatos.id === parseInt(item);
            });
            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - $${miItem[0].precio}`;
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
    }

    /**
    * Evento para borrar un elemento del carrito
    */
    function borrarItemCarrito(evento) {
        // Obtenemos el producto ID que hay en el boton pulsado
        const id = evento.target.dataset.item;
        console.log(id);    
        // Borramos todos los productos
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        // volvemos a renderizar
        renderizarCarrito();
        // Calculamos de nuevo el precio
        calcularTotal();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();
        //Restar numero de item
        addNumCompras(true);

    }

    /**
    * Calcula el precio total teniendo en cuenta los productos repetidos
    */
    function calcularTotal() {
        // Limpiamos precio anterior
        total = 0;
        // Recorremos el array del carrito
        carrito.forEach((item) => {
            // De cada elemento obtenemos su precio
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            total = total + miItem[0].precio;
        });
        // Renderizamos el precio en el HTML
        DOMtotal.textContent = total.toFixed(2);
    }

    /**
    * Varia el carrito y vuelve a dibujarlo
    */
    function vaciarCarrito() {
        //borrar
        a = 0;
        document.getElementById("sum").innerHTML = "";
        //addNumCompras(true);
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
        calcularTotal();
        // Borra LocalStorage
        localStorage.clear();

    }

    function guardarCarritoEnLocalStorage () {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));

    }

    function cargarCarritoDeLocalStorage () {
        // ¿Existe un carrito previo guardado en LocalStorage?
        if (miLocalStorage.getItem('carrito') !== null) {
            // Carga la información
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }

    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    // Inicio
    cargarCarritoDeLocalStorage();
    renderizarProductos();
    calcularTotal();
    renderizarCarrito();
}



// Función Reseña de Estrellas


var calificacion; // aqui se guarda la calificacion del producto
function calificar(item) {
    calificacion=parseInt(item.id[0]); //Captura el primer caracter del id del item
    let nombre = item.id.substring(1) //Captura el resto del id del item
    for(let i = 0; i < 5; i++) { //Ciclo para recorrer todos los items
        // Si el item actual es menor que la calificacion se colorea de naranja
        if(i < calificacion) {
            document.getElementById((i+1)+nombre).style.color = '#FCA311';
        } 
        //Si el item actual es mayor que la calificacion se colorea de gris
        else {
            document.getElementById((i+1)+nombre).style.color = 'lightgrey'; 
        }
    }
}




//   /$$$$$$$$                 /$$                                                     /$$                                                                                            
//  |__  $$__/                | $$                                                    | $$                                                                                            
//     | $$     /$$$$$$   /$$$$$$$  /$$$$$$   /$$$$$$$        /$$$$$$   /$$$$$$   /$$$$$$$  /$$$$$$  /$$$$$$/$$$$   /$$$$$$   /$$$$$$$        /$$$$$$$  /$$$$$$   /$$$$$$             
//     | $$    /$$__  $$ /$$__  $$ /$$__  $$ /$$_____/       /$$__  $$ /$$__  $$ /$$__  $$ /$$__  $$| $$_  $$_  $$ /$$__  $$ /$$_____/       /$$_____/ /$$__  $$ /$$__  $$            
//     | $$   | $$  \ $$| $$  | $$| $$  \ $$|  $$$$$$       | $$  \ $$| $$  \ $$| $$  | $$| $$$$$$$$| $$ \ $$ \ $$| $$  \ $$|  $$$$$$       |  $$$$$$ | $$$$$$$$| $$  \__/            
//     | $$   | $$  | $$| $$  | $$| $$  | $$ \____  $$      | $$  | $$| $$  | $$| $$  | $$| $$_____/| $$ | $$ | $$| $$  | $$ \____  $$       \____  $$| $$_____/| $$                  
//     | $$   |  $$$$$$/|  $$$$$$$|  $$$$$$/ /$$$$$$$/      | $$$$$$$/|  $$$$$$/|  $$$$$$$|  $$$$$$$| $$ | $$ | $$|  $$$$$$/ /$$$$$$$/       /$$$$$$$/|  $$$$$$$| $$       
//     |__/    \______/  \_______/ \______/ |_______/       | $$____/  \______/  \_______/ \_______/|__/ |__/ |__/ \______/ |_______/       |_______/  \_______/|__/      
//                                                          | $$                                                                                                                      
//   /$$      /$$                       /$$                 | $$                               /$$$$$$           /$$       /$$  /$$$$$$                  /$$           /$$            
//  | $$$    /$$$                      | $$                 |__/                              /$$__  $$         /$$/      /$$/ /$$__  $$                | $$          |  $$           
//  | $$$$  /$$$$  /$$$$$$   /$$$$$$$ /$$$$$$    /$$$$$$   /$$$$$$   /$$$$$$$        /$$$$$$ | $$  \__/        /$$/      /$$/ | $$  \__/  /$$$$$$   /$$$$$$$  /$$$$$$  \  $$          
//  | $$ $$/$$ $$ |____  $$ /$$_____/|_  $$_/   /$$__  $$ /$$__  $$ /$$_____/       /$$__  $$| $$$$           /$$/      /$$/  | $$       /$$__  $$ /$$__  $$ /$$__  $$  \  $$         
//  | $$  $$$| $$  /$$$$$$$|  $$$$$$   | $$    | $$$$$$$$| $$  \__/|  $$$$$$       | $$  \ $$| $$_/          |  $$     /$$/   | $$      | $$  \ $$| $$  | $$| $$$$$$$$   /$$/         
//  | $$\  $ | $$ /$$__  $$ \____  $$  | $$ /$$| $$_____/| $$       \____  $$      | $$  | $$| $$             \  $$   /$$/    | $$    $$| $$  | $$| $$  | $$| $$_____/  /$$/          
//  | $$ \/  | $$|  $$$$$$$ /$$$$$$$/  |  $$$$/|  $$$$$$$| $$       /$$$$$$$/      |  $$$$$$/| $$              \  $$ /$$/     |  $$$$$$/|  $$$$$$/|  $$$$$$$|  $$$$$$$ /$$/           
//  |__/     |__/ \_______/|_______/    \___/   \_______/|__/      |_______/        \______/ |__/               \__/|__/       \______/  \______/  \_______/ \_______/|__/            
//                                                                                                                                                                                    
//                                                                                                                                                                                    
// 