import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const navigate = useNavigate();
	const { store, dispatch } = useGlobalReducer();

	const isLogged = !!store.token || !!localStorage.getItem("token");

	const handleLogout = () => {
		localStorage.removeItem("token");
		dispatch({ type: "set_token", payload: null });
		navigate("/goodbye");
	};

	return (
		<nav
			className="navbar navbar-expand-lg fixed-top"
			style={{
				background: "linear-gradient(90deg, #d42424, #3b4cca)",
				boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
			}}
		>
			<div className="container-fluid">

				{/* Logo */}
				<Link to={isLogged ? "/pokedex" : "/"} className="navbar-brand fw-bold text-white" style={{ fontSize: "1.4rem" }}>
					Pokédex
				</Link>

				<div className="d-flex gap-3">

					{/* 🔐 Si NO está logeado */}
					{!isLogged && (
						<Link to="/login" className="btn btn-warning fw-bold">
							Iniciar sesión / Registrarse
						</Link>
					)}

					{/* 🧑‍🚀 Si está logeado */}
					{isLogged && (
						<>
							{/*  Mis favoritos */}
							<Link to="/favoritos" className="btn btn-light fw-bold">
								Mis favoritos⭐
							</Link>

							{/*  Perfil */}
							<Link to="/perfil" className="btn btn-light fw-bold">
								Perfil 👤
							</Link>

							{/* 🚪 Cerrar sesión */}
							<button
								className="btn btn-dark fw-bold"
								onClick={handleLogout}
							>
								Cerrar sesión
							</button>
						</>
					)}
				</div>

			</div>
		</nav>
	);
};
