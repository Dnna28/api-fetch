// Función para mostrar los usuarios en la interfaz de usuario
function mostrarUsuarios(usuarios) {
    const container = document.getElementById('usersContainer');
    container.innerHTML = ''; // Limpiar el contenido anterior

    usuarios.forEach(usuario => {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const avatar = document.createElement('img');
        avatar.classList.add('avatar');
        avatar.src = usuario.avatar;

        const id = document.createElement('p');
        id.classList.add('card-text');
        id.textContent = `ID: ${usuario.id}`;

        const nombre = document.createElement('h5');
        nombre.classList.add('card-title');
        nombre.textContent = `Nombre: ${usuario.first_name} ${usuario.last_name}`;

        const correo = document.createElement('p');
        correo.classList.add('card-text');
        correo.textContent = `Correo: ${usuario.email}`;

        cardBody.appendChild(avatar);
        cardBody.appendChild(id);
        cardBody.appendChild(nombre);
        cardBody.appendChild(correo);
        card.appendChild(cardBody);
        container.appendChild(card);
    });
}

// Función para mostrar el indicador de carga
function mostrarCarga() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.classList.remove('d-none');
}

// Función para ocultar el indicador de carga
function ocultarCarga() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.classList.add('d-none');
}

// Función para realizar la solicitud Fetch y mostrar los usuarios
function leerUsuarios() {
    const cacheKey = 'usuarios_cache';
    const cacheExpiration = 30000; // 30 segundos

    // Verificar si los datos están en caché y dentro del tiempo de vida
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        const currentTime = Date.now();
        if (currentTime - timestamp < cacheExpiration) {
            mostrarUsuarios(data);
            ocultarCarga();
            return;
        }
    }

    // Mostrar el indicador de carga
    mostrarCarga();

    // Realizar la solicitud Fetch
    fetch('https://reqres.in/api/users?delay=3')
        .then(response => response.json())
        .then(data => {
            mostrarUsuarios(data.data);

            // Almacenar los datos en caché
            const cacheData = {
                data: data.data,
                timestamp: Date.now()
            };
            localStorage.setItem(cacheKey, JSON.stringify(cacheData));

            ocultarCarga();
        })
        .catch(error => {
            console.error('Error:', error);
            ocultarCarga();
        });
}

// Asociar la función leerUsuarios al evento click del botón
const fetchButton = document.getElementById('fetchButton');
fetchButton.addEventListener('click', leerUsuarios);
