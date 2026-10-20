import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import styles from './Opiniones.module.css'; // o los estilos que uses

const Opiniones = ({ productoId }) => {
  const [opiniones, setOpiniones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOpiniones = async () => {
      if (!productoId) return;
      setCargando(true);
      try {
        // Consultamos en la colección "opiniones" filtrando por el campo "productoId"
        const opinionesRef = collection(db, "opiniones");
        const q = query(opinionesRef, where("productoId", "==", productoId));
        const querySnapshot = await getDocs(q);

        const listaOpiniones = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setOpiniones(listaOpiniones);
      } catch (err) {
        console.error("Error al obtener opiniones:", err);
        setError("No se pudieron cargar las opiniones");
      } finally {
        setCargando(false);
      }
    };

    fetchOpiniones();
  }, [productoId]);

  if (cargando) return <div className={styles.cargando}>Cargando opiniones...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.opinionesContainer}>
      <h2>Opiniones de los clientes</h2>
      {opiniones.length === 0 ? (
        <p>Aún no hay opiniones para este producto.</p>
      ) : (
        <ul className={styles.listaOpiniones}>
          {opiniones.map((op) => (
            <li key={op.id} className={styles.opinionCard}>
              <div className={styles.headerOpinion}>
                <strong>{op.clienteNombre || 'Anónimo'}</strong>
                <span>⭐ {op.rating} / 5</span>
              </div>
              <p>{op.comentario}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Opiniones;