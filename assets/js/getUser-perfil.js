// Recupera los datos del usuario logeado y los devuelve en el dom
let imagen;
const usuarioImagen = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
const usuarioNombre = document.getElementById('usuarioNombre');
const usuarioAcerca = document.getElementById('usuarioAcerca');

const usuarioEmail = document.getElementById('usuarioEmail');
const usuarioTelefono = document.getElementById('usuarioTelefono');
const usuarioEstado = document.getElementById('usuarioEstado');

const educacionGrado = document.getElementById('educacionGrado');
const educacionInstitucion = document.getElementById('educacionInstitucion');
const educacionDescripcion = document.getElementById('educacionDescripcion');

const experienciaPuesto = document.getElementById('experienciaPuesto');
const experienciaEmpresa = document.getElementById('experienciaEmpresa');
const experienciaDescripcion = document.getElementById('experienciaDescripcion');

fetch('https://masters-of-code-back.herokuapp.com/user/auth', {
    method: 'GET',
    headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
    .then(user => {
        imagen += `<img src="${user.imagen_perfil}" alt="img-avatar"></img>`
        usuarioImagen.innerHTML = imagen;
        usuarioNombre.innerHTML = user.name;
        usuarioAcerca.innerHTML = user.acerca;

        usuarioEmail.innerHTML = user.username;
        usuarioTelefono.innerHTML = user.telefono;
        usuarioEstado.innerHTML = user.ciudad;
        
        educacionGrado.innerHTML = user.educacion.gradoAcademico;
        educacionInstitucion.innerHTML = user.educacion.institucion;
        educacionDescripcion.innerHTML = user.educacion.descripcion;

        experienciaPuesto.innerHTML = user.experiencia.puesto;
        experienciaEmpresa.innerHTML = user.experiencia.empresa;
        experienciaDescripcion.innerHTML = user.experiencia.descripcion;
})