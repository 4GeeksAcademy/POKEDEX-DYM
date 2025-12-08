import { useState, useEffect } from "react";

export default function Perfil() {
    const [profile, setProfile] = useState(null);
    const [nickname, setNickname] = useState("");
    const [bio, setBio] = useState("");
    const [region, setRegion] = useState("");
    const [favoritePokemon, setFavoritePokemon] = useState("");
    const [message, setMessage] = useState("");

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const token = localStorage.getItem("token");

    // Cargar perfil del usuario
    useEffect(() => {
        fetch(`${backendUrl}/api/profile`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setProfile(data);
                setNickname(data.username || "");
                setBio(data.bio || data.message || "");
                setRegion(data.region || "");
                setFavoritePokemon(data.favorite_Pokemon || "");
            })
            .catch(err => {
                console.log("Error cargando perfil:", err);
                setMessage("❌ Error al cargar el perfil");
                });
    }, [backendUrl, token]);

    // Guardar nickname
    const handleSave = async () => {
        setMessage("");

        try {
            const resp = await fetch(`${backendUrl}/api/profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    username: nickname,
                    bio: bio,
                    region: region,
                    favorite_pokemon: favoritePokemon,
                })
            });

            const data = await resp.json();
            console.log("PUT /api/profile ->", resp.status, data);

            if (resp.ok) {
                setMessage("✔ Perfil actualizado correctamente");
                setProfile(prev => ({
                    ...(prev || {}),
                    username: data.username ?? nickname,
                    bio: data.bio ?? bio,
                    region: data.region ?? region,
                    favorite_Pokemon: data.favorite_pokemon ?? favoritePokemon,
                }));
            } else {
                setMessage("❌ " + (data.msg || data.message || "Error al actualizar"));
            } 
        }
        catch (err) {
                console.log("Error guardando el perfil:", err);
                setMessage("❌ Error al guardar los cambios");
            }
        };

    if (!profile) return <p className="m-4">Cargando perfil...</p>;

    return (
        <div className="container mt-4" style={{ maxWidth: "500px" }}>
            <h2 className="fw-bold mb-4">👤 Mi Perfil</h2>

            <div className="card p-4 shadow">
                {/* Email */}
                <div className="mb-3">
                    <label className="form-label fw-bold">Correo:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={profile.email}
                        disabled
                    />
                </div>

                {/* Nickname editable */}
                <div className="mb-3">
                    <label className="form-label fw-bold">Trainer:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </div>

                {/* Bio del trainer */}
                <div className="mb-3">
                    <label className="form-label fw-bold">Bio:</label>
                    <textarea
                        className="form-control"
                        rows={3}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </div>

                {/* Región fav */}
                <div className="mb-3">
                    <label className="form-label fw-bold">Región favorita:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                    />
                </div>

                {/* Pokémon Fav */}
                <div className="mb-3">
                    <label className="form-label fw-bold">Bio:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={favoritePokemon}
                        onChange={(e) => setFavoritePokemon(e.target.value)}
                    />
                </div>

                {/* Mensaje */}
                {message && (
                    <p className="text-center fw-bold mt-2"
                        style={{ color: respOkColor(message) }}>
                        {message}
                    </p>
                )}

                {/* Botón guardar */}
                <button
                    className="btn btn-primary w-100 mt-2"
                    onClick={handleSave}
                >
                    Guardar cambios
                </button>
            </div>
        </div>
    );
}

// Helper para colorear mensajes
function respOkColor(msg) {
    return msg.startsWith("✔") ? "green" : "red";
}
