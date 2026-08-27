import Asistentes from "./Asistentes";

const Bienvenida = () => {
  
  const asistentes = [
    { nombre: "Juan Pérez", tarea: "Frontend Developer", emoji: "" },
    { nombre: "Ana Gómez", tarea: "Diseñadora UX/UI", emoji: "" },
    { nombre: "Carlos Ruiz", tarea: "Backend Developer", emoji: "" },
  ];

  return (
    <div>
      <h2>Bienvenidos</h2>
      <Asistentes personas={asistentes} />
    </div>
  );
};

export default Bienvenida;
