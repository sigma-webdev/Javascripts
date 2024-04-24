const apiEndPoint = 'https://pokeapi.co/api/v2/pokemon';
const speciesAboutEndPoint = 'https://pokeapi.co/api/v2/pokemon-species';

const pokemonData = {
    id: "",
    avatar: "",
    name: "",
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

const getRandomPokemonId = () => {
    return Math.floor(Math.random() * 898) + 1; // Generate a random Pokémon ID between 1 and 898 (total Pokémon count in the API)
};

const fetchPokemonData = async () => {
    const id = getRandomPokemonId();

    try {
        // Fetch Pokémon data
        const pokemonResponse = await fetch(`${apiEndPoint}/${id}`);
        if (!pokemonResponse.ok) {
            throw new Error('Failed to fetch Pokémon data');
        }
        const pokemonDataResponse = await pokemonResponse.json();
        // Populate pokemonData object with Pokémon data
        pokemonData.id = pokemonDataResponse.id;
        pokemonData.name = pokemonDataResponse.name;
        pokemonData.avatar = pokemonDataResponse.sprites.other["official-artwork"].front_default;
        pokemonData.weight = pokemonDataResponse.weight;
        pokemonData.height = pokemonDataResponse.height;
        pokemonData.stats.hp = pokemonDataResponse.stats.find(stat => stat.stat.name === 'hp').base_stat;
        pokemonData.stats.atk = pokemonDataResponse.stats.find(stat => stat.stat.name === 'attack').base_stat;
        pokemonData.stats.def = pokemonDataResponse.stats.find(stat => stat.stat.name === 'defense').base_stat;
        pokemonData.stats.spd = pokemonDataResponse.stats.find(stat => stat.stat.name === 'speed').base_stat;

        // Fetch Pokémon species data
        const speciesResponse = await fetch(`${speciesAboutEndPoint}/${id}`);
        if (!speciesResponse.ok) {
            throw new Error('Failed to fetch Pokémon species data');
        }
        const speciesDataResponse = await speciesResponse.json();

        // Populate pokemonData object with Pokémon species data (extract English flavor text)
        const englishFlavorText = speciesDataResponse.flavor_text_entries.find(entry => entry.language.name === 'en');
        if (englishFlavorText) {
            pokemonData.about = englishFlavorText.flavor_text;
        }

        console.log(pokemonData); // Log populated pokemonData object
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }

    console.log(pokemonData)
};

fetchPokemonData();

