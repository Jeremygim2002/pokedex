const boton = document.querySelector('#busqueda button');
const entrada = document.querySelector('#busqueda input');

boton.addEventListener('click', buscarPokemon);
entrada.addEventListener('keydown', function(e) {
    if (e.key === "Enter") {
        buscarPokemon();
    }
});

function buscarPokemon() {
    const dato = entrada.value.toLowerCase();
    const url = 'https://pokeapi.co/api/v2/pokemon/' + dato;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then(result => {
            const container = document.querySelector('#container2');
            container.innerHTML = `
                <div id="container2">
                    <div class="poke">
                        <h2>${result.name}</h2>
                        <img src="${result.sprites.other.home.front_default}" height="300px" width="300px" alt="">
                        <p>${result.order}</p>
                    </div>
                </div>
            `;
            entrada.value = ""
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No encuentro el nombre del pokémon en mi base de datos, prueba con otro nombre.',
            })
            console.log('Ocurrió un error:', error);
            entrada.value = ""
        });
}

