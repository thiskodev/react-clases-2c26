import styles from './Paginacion.module.css';

const Paginacion = ({
  paginaActual = 1,
  totalPaginas = 1,
  alCambiarPagina,
  maximoVisibles = 5,
  deshabilitado = false,
}) => {
  // Aseguramos que siempre exista al menos la página 1 para mostrar los botones
  const totalSeguro = Math.max(1, totalPaginas);

  // Calcula la ventana deslizante de números visibles
  const obtenerNumerosPagina = () => {
    const mitad = Math.floor(maximoVisibles / 2);
    let inicio = Math.max(1, paginaActual - mitad);
    let fin = Math.min(totalSeguro, inicio + maximoVisibles - 1);

    if (fin - inicio + 1 < maximoVisibles) {
      inicio = Math.max(1, fin - maximoVisibles + 1);
    }

    const paginas = [];
    for (let i = inicio; i <= fin; i++) {
      paginas.push(i);
    }
    return paginas;
  };

  const paginasVisibles = obtenerNumerosPagina();

  const anteriorDeshabilitado = deshabilitado || paginaActual <= 1;
  const siguienteDeshabilitado = deshabilitado || paginaActual >= totalSeguro;

  return (
    <nav className={styles.contenedorPaginacion} aria-label="Paginación">
      {/* Flecha Anterior */}
      <button
        type="button"
        className={`${styles.botonPagina} ${styles.botonFlecha}`}
        onClick={() => alCambiarPagina(paginaActual - 1)}
        disabled={anteriorDeshabilitado}
        aria-label="Página anterior"
      >
        &lt;
      </button>

      {/* Números de página */}
      {paginasVisibles.map((numero) => (
        <button
          key={numero}
          type="button"
          className={`${styles.botonPagina} ${
            numero === paginaActual ? styles.paginaActiva : ''
          }`}
          onClick={() => alCambiarPagina(numero)}
          disabled={deshabilitado}
          aria-current={numero === paginaActual ? 'page' : undefined}
        >
          {numero}
        </button>
      ))}

      {/* Flecha Siguiente */}
      <button
        type="button"
        className={`${styles.botonPagina} ${styles.botonFlecha}`}
        onClick={() => alCambiarPagina(paginaActual + 1)}
        disabled={siguienteDeshabilitado}
        aria-label="Página siguiente"
      >
        &gt;
      </button>
    </nav>
  );
};

export default Paginacion;