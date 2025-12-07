import { useState } from "react";

export default function PokemonCard({ pokemon }) {
    const modalId = `pokemonModal-${pokemon.id}`;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const token = localStorage.getItem("token");

    const [isFavorite, setIsFavorite] = useState(false);

    // Cuando se abre el modal → verificar si es favorito
    const checkFavorite = async () => {
        if (!token) return;

        const resp = await fetch(`${backendUrl}/api/favorites`, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (!resp.ok) return;

        const data = await resp.json();

        const exists = data.some(f => f.pokemon_id === pokemon.id);
        setIsFavorite(exists);
    };

    // Agregar favorito
    const addFavorite = async () => {
        const resp = await fetch(`${backendUrl}/api/favorites`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ pokemon_id: pokemon.id })
        });

        if (resp.ok) {
            setIsFavorite(true);
        }
    };

    // Eliminar favorito
    const removeFavorite = async () => {
        const resp = await fetch(`${backendUrl}/api/favorites/${pokemon.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (resp.ok) {
            setIsFavorite(false);
        }
    };

    return (
        <>
            {/* CARD */}
            <div className="card m-2 p-3 text-center" style={{ width: "14rem" }}>
                <img
                    src={pokemon.image_url}
                    alt={pokemon.name}
                    className="card-img-top"
                    style={{ height: "120px", objectFit: "contain" }}
                />
                <h5 className="mt-3 text-capitalize">{pokemon.name}</h5>

                {/* Botón para abrir modal */}
                <button
                    type="button"
                    className="btn btn-primary mt-2"
                    data-bs-toggle="modal"
                    data-bs-target={`#${modalId}`}
                    onClick={checkFavorite}
                >
                    Ver detalles
                </button>
            </div>

            {/* MODAL */}
            <div
                className="modal fade"
                id={modalId}
                tabIndex="-1"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content p-3">

                        <div className="card border-0">
                            <img
                                src={pokemon.artwork_url || pokemon.image_url}
                                className="card-img-top"
                                alt={pokemon.name}
                                style={{ height: "220px", objectFit: "contain" }}
                            />

                            <div className="card-body text-center">
                                <h4 className="text-capitalize">{pokemon.name}</h4>

                                <p><strong>Altura:</strong> {pokemon.height}</p>
                                <p><strong>Peso:</strong> {pokemon.weight}</p>

                                <p>
                                    <strong>Tipos:</strong>{" "}
                                    {pokemon.types.join(", ")}
                                </p>

                                {/* BOTÓN FAVORITO */}
                                {!isFavorite ? (
                                    <button
                                        className="btn btn-success w-100 mt-3"
                                        onClick={addFavorite}
                                    >
                                        ⭐ Agregar a Favoritos
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-danger w-100 mt-3"
                                        onClick={removeFavorite}
                                    >
                                        ❌ Eliminar de Favoritos
                                    </button>
                                )}

                                {/* BOTÓN CERRAR */}
                                <button
                                    className="btn btn-secondary w-100 mt-2"
                                    data-bs-dismiss="modal"
                                >
                                    Cerrar
                                </button>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
