import { useState, useEffect } from "react";

export default function Perfil() {
    const [profile, setProfile] = useState(null);
    const [nickname, setNickname] = useState("");
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
            });
    }, []);

    // Guardar nickname
    const handleSave = async () => {
        setMessage("");

        const resp = await fetch(`${backendUrl}/api/profile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ username: nickname })
        });

        const data = await resp.json();

        if (resp.ok) {
            setMessage("✔ Nickname actualizado correctamente");
        } else {
            setMessage("❌ " + (data.msg || "Error al actualizar"));
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
                    <label className="form-label fw-bold">Nickname:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
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
