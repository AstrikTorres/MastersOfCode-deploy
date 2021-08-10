// fetch que regresa la lista de solicitudes
resultados = [];
const cardBody = document.querySelector('#cards');
token = localStorage.getItem('token');
fetch('http://localhost:8080/solicitudes/recientes', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
}).then(response => response.json())
.then(data => {
    data.forEach(function (solicitud) {
        resultados += `
    <div class="card mb-5" style="width: 18rem;">
        <div class="card-body">
            <h3 class="card-title">${solicitud.nombre}</h3><br>
            <h6 class="card-subtitle mb-2 text-muted">Solicita: Roberto Martínez</h6>
            <h6 class="card-subtitle mb-2 text-muted">Contacto: robertomtz01@gmail.com</h6>
            <br>
            <p class="card-text">${solicitud.descripcion}</p>
            <p class="card-title" style="font-size: 25px;">${solicitud.presupuesto}</p>
            <button class="btn btn-primary" type="submit"
            style="font-family: Montserrat, sans-serif;background: #FCA311;border-top-style: none;border-top-color: #FCA311;">Enviar Cotización</button>
        </div>
    </div> `            
    })
    cardBody.innerHTML = resultados;
}).catch(error => {
    console.log(error);
});