const apiEndPoint = 'https://pokeapi.co/api/v2/pokemon';
const speciesAboutEndPoint = 'https://pokeapi.co/api/v2/pokemon-species';


const getRandomPokemonId = () => {
    return Math.floor(Math.random() * 898) + 1; // Generate a random Pokémon ID between 1 and 898 (total Pokémon count in the API)
};

const fetchPokemonData = async () => {
    const data = {
        id: "",
        avatar: "",
        name: "",
        types: [], 
        abilities: [],
        weight: "",
        height: "",
        about: "",
        stats: {
            hp: "",
            atk: "",
            def: "",
            spd: ""
        }
    };

    const id = getRandomPokemonId();

    try {
        // Fetch Pokémon data
        const pokemonResponse = await fetch(`${apiEndPoint}/${id}`);
        if (!pokemonResponse.ok) {
            throw new Error('Failed to fetch Pokémon data');
        }
   
        const pokemonDataResponse = await pokemonResponse.json();
       
        // Populate pokemonData object with Pokémon data
        data.id = pokemonDataResponse.id;
        data.name = pokemonDataResponse.name;
        data.avatar = pokemonDataResponse.sprites.other["official-artwork"].front_default;
        data.weight = pokemonDataResponse.weight;
        data.height = pokemonDataResponse.height;
        data.stats.hp = pokemonDataResponse.stats.find(stat => stat.stat.name === 'hp').base_stat;
        data.stats.atk = pokemonDataResponse.stats.find(stat => stat.stat.name === 'attack').base_stat;
        data.stats.def = pokemonDataResponse.stats.find(stat => stat.stat.name === 'defense').base_stat;
        data.stats.spd = pokemonDataResponse.stats.find(stat => stat.stat.name === 'speed').base_stat;

        // adding types 
        pokemonDataResponse.types.forEach(element => {
            data.types.push(element.type.name)
        });

        // adding ability 
       pokemonDataResponse.abilities.forEach((item) => {
        data.abilities.push(item.ability.name)
       })

        // Fetch Pokémon species data
        const speciesResponse = await fetch(`${speciesAboutEndPoint}/${id}`);
        if (!speciesResponse.ok) {
            throw new Error('Failed to fetch Pokémon species data');
        }
        const speciesDataResponse = await speciesResponse.json();

        // Populate pokemonData object with Pokémon species data (extract English flavor text)
        const englishFlavorText = speciesDataResponse.flavor_text_entries.find(entry => entry.language.name === 'en');
        if (englishFlavorText) {
            data.about = englishFlavorText.flavor_text;
        }

       
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
    
    return data
};

// if pokemon data is fetch successful render with pokemon data || render fail dom
function fetchAndRenderPokemondata() {
    fetchPokemonData()
    .then(pokemonData => {
        console.log("Received Pokemon data:", pokemonData)

        //  set pokemon name 
        document.getElementById("pokemonName").textContent = pokemonData.name[0].toUpperCase() + pokemonData.name.substring(1)

        // set pokemon id
        document.getElementById("pokemonId").textContent = "#0"+ pokemonData.id

        // set pokemon avatar 
        document.getElementById("pokemonAvatar").src = pokemonData.avatar

        // set pokemon types 
        const types = document.getElementById("pokemonType")
        types.innerHTML = ""
        pokemonData.types.forEach(type => {
            const pElement = document.createElement('p')
            pElement.textContent = type
            pElement.className = 'bg-[#74CB48] rounded-2xl px-3 py-1 font-bold'
            types.appendChild(pElement) 
        })

        // set pokemon weight
        document.getElementById("pokemonWeight").textContent = pokemonData.weight

        // set height 
        document.getElementById("pokemonHeight").textContent = pokemonData.height 

        // set moves ability 
        const abilities = document.getElementById("pokemonMoves")
        abilities.innerHTML = ""
        pokemonData.abilities.forEach((ability) => {
            const abilityElement = document.createElement("p")
            abilityElement.textContent = ability[0].toUpperCase() + ability.substring(1)
            abilities.appendChild(abilityElement)
            
        })

        // set about
        document.getElementById("pokemonAbout").textContent = pokemonData.about

        // set stats
        document.getElementById("pokemonHp").textContent = pokemonData.stats.hp
        document.getElementById("pokemonAtk").textContent = pokemonData.stats.atk 
        document.getElementById("pokemonDef").textContent = pokemonData.stats.def 
        document.getElementById("pokemonSpd").textContent = pokemonData.stats.spd


    })
    .catch(error => {
        console.error("Error fetching Pokemon data", error)
    })

}


