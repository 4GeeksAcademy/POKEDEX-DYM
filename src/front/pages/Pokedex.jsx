import { useEffect, useState } from "react";
/*import axios from "axios";*/
import PokemonCard from "../components/PokemonCard";

export default function Pokedex() {
    const [pokemons, setPokemons] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        fetch(`${backendUrl}/api/pokemons`)
            .then(res => res.json())
            .then(data => {
                setPokemons(data); 
            })
            .catch(err => console.error("Error cargando Pokémon:", err));
    }, []);

    return (
        <div className="container mt-4 d-flex flex-wrap">
            {pokemons.map((pkm, i) => <PokemonCard key={i} pokemon={pkm} />)}
        </div>
    );
}