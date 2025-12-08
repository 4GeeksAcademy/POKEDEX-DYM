export default function Conocenos() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background: "linear-gradient(135deg, #4a6cf7, #b33bf5, #ff4d6d)",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        marginTop: "-22px"
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
          animation: "fadeIn 1s ease-in-out",
        }}
      >
        <h1 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "20px" }}>
          ¡Hola, trainers! ⚡
        </h1>

        <p style={{ fontSize: "1.1rem", lineHeight: "1.7" }}>
          Nosotras somos <strong>Dani</strong> y <strong>Mafer</strong>. Una pareja de entrenadoras
          que lleva casi 3 años compartiendo aventuras, risas, cafés y más. Nos conocimos en una
          oficina (sí, como un encuentro random en la hierba alta). Con el tiempo pasamos de
          compañeras de trabajo, a compañeras de vida… y ahora también compartimos ¡una Pokédex propia!
        </p>

        <h2 style={{ textAlign: "center", marginTop: "35px" }}>Por qué una Pokédex❓</h2>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.7" }}>
          Porque los Pokémon siempre han sido parte de nuestra energía compartida:
          <ul style={{ marginTop: "10px" }}>
            <li>🎮 <strong>Mafer</strong>: gamer nata, recorriendo regiones desde pequeña.</li>
            <li>📱 <strong>Dani</strong>: nueva entrenadora obsesionada con PokémonGO.</li>
          </ul>
          Queríamos un proyecto final del bootcamp que nos representara a ambas… ¡y nada mejor que una Pokédex!
        </p>

        <h2 style={{ textAlign: "center", marginTop: "35px" }}> Nuestro viaje como entrenadoras 🧭</h2>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.7" }}>
          Este proyecto es, para nosotras, como recorrer juntas una nueva región:
        </p>

        <ul style={{ marginLeft: "20px", fontSize: "1.1rem", lineHeight: "1.7" }}>
          <li>⚔️ Enfrentamos retos</li>
          <li>⭐ Subimos de nivel</li>
          <li>📚 Aprendimos nuevas habilidades</li>
          <li>❤️ Y lo hicimos en equipo como un dúo legendario</li>
        </ul>

        <h2 style={{ textAlign: "center", marginTop: "35px" }}>✨ Gracias por unirte a nuestras aventuras ✨</h2>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.7" }}>
          Esperamos que esta Pokédex te acompañe en tu viaje y te inspire a seguir explorando… y quién sabe,
          quizá a crear tu propio proyecto legendario.
        </p>

        <h3 style={{ textAlign: "center", marginTop: "40px" }}>
          ¡Adelante, trainer! Tu próxima captura te está esperando🔥
        </h3>
      </div>
    </div>
  );
}
