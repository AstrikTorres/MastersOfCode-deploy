// Recupera el Id del usuario logeado y  lo guarda en la variable global userId

let userId;
fetch('https://masters-of-code-back.herokuapp.com/user/auth', {
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