import { useEffect, useState } from "react";

export default function Favoritos() {
    const [favorites, setFavorites] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) return;

        fetch(`${backendUrl}/api/favorites`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setFavorites(data))
            .catch(err => console.error("Error cargando favoritos:", err));
    }, []);

    // Eliminar un favorito
    const removeFavorite = async (pokemonId) => {
        const resp = await fetch(`${backendUrl}/api/favorites/${pokemonId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (resp.ok) {
            // Filtrar en frontend para actualizar vista
            setFavorites(prev => prev.filter(f => f.pokemon_id !== pokemonId));
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="fw-bold mb-4">⭐ Mis Pokemones Favoritos</h2>

            {favorites.length === 0 && (
                <p className="text-muted">Aún no tienes favoritos.</p>
            )}

            <div className="d-flex flex-wrap">
                {favorites.map(fav => {
                    const p = fav.pokemon; // Info del Pokémon
                    const modalId = `favoriteModal-${p.id}`;

                    return (
                        <div
                            key={fav.id}
                            className="card m-2 p-3 text-center"
                            style={{ width: "14rem" }}
                        >
                            <img
                                src={p.image_url}
                                alt={p.name}
                                className="card-img-top"
                                style={{ height: "120px", objectFit: "contain" }}
                            />

                            <h5 className="mt-3 text-capitalize">
                                {p.name}
                            </h5>

                            {/* Botón para abrir el modal */}
                            <button
                                type="button"
                                className="btn btn-primary mt-2"
                                data-bs-toggle="modal"
                                data-bs-target={`#${modalId}`}
                            >
                                Ver detalles
                            </button>

                            {/* Modal individual */}
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
                                                src={p.artwork_url || p.image_url}
                                                className="card-img-top"
                                                alt={p.name}
                                                style={{ height: "230px", objectFit: "contain" }}
                                            />

                                            <div className="card-body text-center">
                                                <h4 className="text-capitalize">{p.name}</h4>

                                                <p><strong>Altura:</strong> {p.height}</p>
                                                <p><strong>Peso:</strong> {p.weight}</p>

                                                <p><strong>Tipos:</strong> {p.types.join(", ")}</p>

                                                {/* Eliminar favorito */}
                                                <button
                                                    className="btn btn-danger w-100 mt-3"
                                                    onClick={() => removeFavorite(p.id)}
                                                    data-bs-dismiss="modal"
                                                >
                                                    ❌ Eliminar de Favoritos
                                                </button>

                                                {/* Cerrar */}
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

                        </div>
                    );
                })}
            </div>
        </div>
    );
}
