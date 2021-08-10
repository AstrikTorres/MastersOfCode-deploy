resultados = [];
const reviews = document.querySelector('#reseñas');
token = localStorage.getItem('token');
fetch('http://localhost:8080/resenas', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
}).then(response => response.json())
.then(data => {
    data.forEach(function (resena) {
        function renderEstrellas(calificacion) {
            let estrellas = '';
            for (let i = 0; i < 5; i++) {
                if (i < calificacion) {
                    estrellas += '<i class="fa fa-star"></i>';
                } else {
                    estrellas += '<i class="fa fa-star-o"></i>';
                }
            }
            return estrellas;
        }
        resultados +=
        `<div class="review-item">
            <div class="rating">${renderEstrellas(resena.calificacion)}</div>
            <h4>${resena.resumen}</h4><span class="text-muted">10/08/2021</span>
            <p>${resena.opinion}</p>
        </div>`            
    })
    if (resultados.length == 0) {
        resultados += `<div class="review-item">
        <h2 style="color: #FCA311;font-family: Montserrat, sans-serif;font-weight: bold;">No hay ninguna reseña,</br> se el primero en opinar sobre este proyecto!</h2>
    </div>`
    }
    reviews.innerHTML = resultados;
}).catch(error => {
    console.log(error);
});