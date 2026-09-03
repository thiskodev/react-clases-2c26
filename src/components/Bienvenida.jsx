import Asistentes from "./Asistentes";
import Titulos from "./Titulos";
import estilo from "./Titulos.module.css"

const Bienvenida = () => {
  
  const asistentes = [
    { nombre: "Juan Pérez", tarea: "Frontend Developer", emoji: "" },
    { nombre: "Ana Gómez", tarea: "Diseñadora UX/UI", emoji: "" },
    { nombre: "Carlos Ruiz", tarea: "Backend Developer", emoji: "" },
  ];

  const [numero, setNumero] = useState(0);
  const [error, setError] = useState(false);
  const [estaBien, setEstaBien] = useState(false);

  return (
    <div>
      <Titulos>
        <h2>Bienvenidos</h2>
        <h3>Lista de Asistentes</h3>
      </Titulos>
      <Asistentes personas={asistentes} />
    </div>
  );
};

export default Bienvenida;
