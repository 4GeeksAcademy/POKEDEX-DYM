import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Home = () => {

	const navigate = useNavigate();

	return (
		<div
			className="w-100 d-flex flex-column justify-content-center align-items-center"
			style={{
				minHeight: "100vh",
				background: "linear-gradient(135deg, #bc2626ff, #3b4cca)",
				backgroundSize: "cover, auto",
				color: "white",



			}}
		>
			{/* Logo / Imagen */}
			<img
				src="https://www.pngkey.com/png/full/30-309982_19-pokeball-picture-freeuse-stock-ball-pokemon-huge.png"
				alt="Poke Ball"
				className="mb-4"
				style={{ width: "120px" }}
			/>

			<h1 className="fw-bold mb-3" style={{ fontSize: "3rem" }}>
				¡Bienvenido a tu Pokédex!
			</h1>

			<p className="fs-5 mb-4" style={{ maxWidth: "650px" }}>
				La <strong>Pokédex</strong> es una herramienta utilizada por los entrenadores Pokémon
				para consultar información sobre las diferentes especies que encuentran durante su viaje.
			</p>

			{/*<img
				src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
				alt="Pikachu"
				className="mb-4"
				
			/>*/}

			<button
				onClick={() => navigate("/login")}
				className="btn btn-light btn-lg px-5 py-3 fw-bold shadow"
				style={{
					borderRadius: "50px",
					fontSize: "1.3rem"
				}}
			>
				Iniciar Sesión / Registrarse
			</button>
		</div>
	);
}; 