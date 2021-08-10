// Recupera el Id del usuario logeado y  lo guarda en la variable global userId

let userId;
fetch('http://localhost:8080/user/auth', {
    method: 'GET',
    headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(user => {
    userId = user.id;
})