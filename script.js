
// EJERCICIO 3
function buscarPokemonPorID() {
    const id = document.getElementById("pokemonId").value;

    if (id === "") {
        console.log("Debe ingresar un ID");
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log("Nombre del Pokémon:", data.name);
        })
        .catch(err => console.error("Error:", err));
}

// EJERCICIO 4
function datosPikachuThen() {
    fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
        .then(res => res.json())
        .then(data => {
            console.log("Altura de Pikachu:", data.height);
            console.log("Peso de Pikachu:", data.weight);
        })
        .catch(err => console.error("Error:", err));
}

// EJERCICIO 5
async function datosPikachuAsync() {
    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");

        if (!res.ok) {
            throw new Error("Error en la solicitud: " + res.status);
        }

        const data = await res.json();
        console.log("Altura de Pikachu:", data.height);
        console.log("Peso de Pikachu:", data.weight);

    } catch (error) {
        console.error("Error:", error.message);
    }
}

// EJERCICIO 6
function spriteCharizard() {
    fetch("https://pokeapi.co/api/v2/pokemon/charizard")
        .then(res => res.json())
        .then(data => {
            console.log("Sprite de Charizard:", data.sprites.front_default);
        });
}

// EJERCICIO 7
function listar20() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
        .then(res => res.json())
        .then(data => {
            data.results.forEach((p, index) => {
                console.log(`${index + 1} - ${p.name}`);
            });
        });
}

// EJERCICIO 8
function pokemonAleatorio() {
    const id = Math.floor(Math.random() * 898) + 1;

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log("Pokémon aleatorio:", data.name);
        });
}

// EJERCICIO 9
async function buscadorVisual() {
    const id = document.getElementById("pokemonVisualId").value;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();

    const habilidades = data.abilities.map(h => h.ability.name).join(", ");

    document.getElementById("resultadoVisual").innerHTML = `
        <h3>${data.name}</h3>
        <img src="${data.sprites.front_default}">
        <p>ID: ${data.id}</p>
        <p>Peso: ${data.weight}</p>
        <p>Altura: ${data.height}</p>
        <p>Habilidades: ${habilidades}</p>
    `;
}

// EJERCICIO 10
async function mostrarPokemones1al10() {
    const contenedor = document.getElementById("listaPokemones");
    contenedor.innerHTML = "";

    const lista = [];

    for (let i = 1; i <= 10; i++) {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const data = await res.json();
        lista.push(data);
    }

    lista.forEach(p => {
        contenedor.innerHTML += `
            <div style="border:1px solid black; margin:10px; padding:10px;">
                <img src="${p.sprites.front_default}">
                <p>Nombre: ${p.name}</p>
                <p>ID: ${p.id}</p>
            </div>
        `;
    });
}

// EJERCICIO 11
async function mostrarTipos() {
    const valor = document.getElementById("pokemonTipo").value;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${valor}`);
    const data = await res.json();

    const tipos = data.types.map(t => t.type.name).join(", ");

    document.getElementById("tiposResultado").innerHTML = `
        <h3>${data.name}</h3>
        <img src="${data.sprites.front_default}">
        <p>Tipos: ${tipos}</p>
    `;
}

// EJERCICIO 12
async function statsConsola() {
    const valor = document.getElementById("pokemonStatsConsola").value;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${valor}`);
    const data = await res.json();

    console.log("Estadísticas de:", data.name);

    data.stats.forEach(stat => {
        console.log(`${stat.stat.name}: ${stat.base_stat}`);
    });
}

// EJERCICIO 13
async function statsHTML() {
    const valor = document.getElementById("pokemonStatsHTML").value;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${valor}`);
    const data = await res.json();

    let html = `<h3>Estadísticas de ${data.name}</h3><ul>`;

    data.stats.forEach(stat => {
        html += `<li>${stat.stat.name}: ${stat.base_stat}</li>`;
    });

    html += "</ul>";

    document.getElementById("statsResultadoHTML").innerHTML = html;
}

// EJERCICIO 14
let pokemones = [];
let pagina = 0;

async function cargarPokemonesIniciales() {
    for (let i = 1; i <= 12; i++) {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const data = await res.json();
        pokemones.push(data);
    }
    mostrarGrupo();
}

function mostrarGrupo() {
    const inicio = pagina * 3;
    const fin = inicio + 3;

    const grupo = pokemones.slice(inicio, fin);
    const cont = document.getElementById("cards");
    cont.innerHTML = "";

    grupo.forEach(p => {
        cont.innerHTML += `
            <div style="border:1px solid black; margin:10px; padding:10px;">
                <img src="${p.sprites.front_default}">
                <p>Nombre: ${p.name}</p>
                <p>ID: ${p.id}</p>
            </div>
        `;
    });
}

function siguiente() {
    if (pagina < 3) {
        pagina++;
        mostrarGrupo();
    }
}

function anterior() {
    if (pagina > 0) {
        pagina--;
        mostrarGrupo();
    }
}

cargarPokemonesIniciales();
