// Ejercicio 3
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
//Ejercicio 4
function datosPikachuThen() {
    fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
        .then(res => res.json())
        .then(data => {
            console.log("Altura de Pikachu:", data.height);
            console.log("Peso de Pikachu:", data.weight);
        })
        .catch(err => console.error("Error:", err));
}
//Ejercicio 5
async function datosPikachuAsync() {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");

        if (!res.ok) {
            throw new Error("Error en la solicitud: " + res.status);
        }

        const data = await res.json();
        console.log("Altura de Pikachu:", data.height);
        console.log("Peso de Pikachu:", data.weight);

}
