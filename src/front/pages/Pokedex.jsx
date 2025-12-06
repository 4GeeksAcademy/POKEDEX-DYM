import { useEffect, useState } from "react";
/*import axios from "axios";*/
import PokemonCard from "../components/PokemonCard";

export default function Pokedex() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
            .then(res => res.json())
            .then(async data => {
                const results = await Promise.all(
                    data.results.map(async p => {
                        const info = await fetch(p.url).then(r => r.json());
                        return {
                            name: p.name,
                            image: info.sprites.front_default
                        };
                    })
                );
                setPokemons(results);
            })
            .catch(err => console.error("Error cargando Pokémon:", err));
    }, []);

    return (
        <div className="container mt-4 d-flex flex-wrap">
            {pokemons.map((pkm, i) => <PokemonCard key={i} pokemon={pkm} />)}
        </div>
    );
}