const Asistentes = ({ personas }) => {
  return (
    <ul>
      {personas.map((persona, index) => (
        <li key={index}>
          {persona.nombre}: {persona.tarea}
        </li>
      ))}
    </ul>
  );
};

export default Asistentes;
