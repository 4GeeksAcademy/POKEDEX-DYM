export default function PokemonCard({ pokemon }) {
    return (
        <div className="card m-2 p-3 text-center">
            <img src={pokemon.image} alt={pokemon.name} className="card-img-top" />
            <h5 className="mt-3">{pokemon.name}</h5>
        </div>
    );
}