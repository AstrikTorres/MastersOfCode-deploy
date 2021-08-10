const btnDeleteUser = document.querySelector('#btnDeleteUser');
// evento para eliminar usuario por fetch con un token
btnDeleteUser.addEventListener('click', function (e) {
    let confirmar = confirm('¿Esta seguro de que desea eliminar este usuario?');
    if (confirmar) {
        fetch('http://localhost:8080/user/' + userId, {
            method: 'DELETE',
            headers: {
                'Authorization': token,
                "Content-Type": "application/json"
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                if (response.status === 200) {
                    location.href = 'index.html';
                } else {
                    alert('Hubo un error al eliminar el usuario');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
});