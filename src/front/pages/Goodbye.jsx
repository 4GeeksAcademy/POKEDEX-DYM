import { Link } from "react-router-dom";
import medallasIMG from "../assets/img/medallas.png";


export default function Goodbye() {
    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #3b4cca, #d42424)",
                color: "white",
                textAlign: "center",
                padding: "20px",
                marginTop: "-80px"
            }}
        >
            <img
                src={medallasIMG}
                style={{ width: "350px", marginBottom: "20px" }}
            />
            <h1 className="fw-bold mb-3">👋 ¡Hasta pronto, entrenadorx!</h1>

            <p className="fs-5 mb-4">
                Tu sesión se ha cerrado correctamente.<br /> 
                Esperamos verte de nuevo para seguir atrapándolos a todos.
            </p>

            <Link to="/login" className="btn btn-light fw-bold px-4 py-2">
                Iniciar sesión nuevamente
            </Link>
        </div>
    );
}
