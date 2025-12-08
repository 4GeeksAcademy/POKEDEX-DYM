import { Link } from "react-router-dom";


export const Footer = () => (
	<footer className="footer py-1 text-center"
		style={{
			background: "linear-gradient(90deg, #d42424ff, #3b4ccaff)",
			color: "white",
		}}
	>
		<p>
			Proyecto Final Pokédex • React + Flask • PokéAPI
		</p>
		<p>
			Hecho con <i className="fa fa-heart text-danger" /> por {" "}
			<Link to="/nosotras" style={{ color: "white", textDecoration: "underline"}} >
			Dani & Mafer 
			</Link> aplicando lo aprendido en {" "} 
		<a href="http://www.4geeksacademy.com" style={{color:"white"}}>4Geeks Academy</a>
		</p>
	</footer >
);