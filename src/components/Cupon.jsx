import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import estilos from './Cupon.module.css';

const Cupon = () => {
  const [cupones, setCupones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
  const fetchCupones = async () => {
    try {
      setCargando(true);
      const querySnapshot = await getDocs(collection(db, 'cupones'));
      const docs = querySnapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setCupones(docs);
    } catch (err) {
      console.error('Error al obtener cupones:', err);
      setError('Ocurrió un error al cargar los cupones.');
    } finally {
      setCargando(false);
    }
  };

  fetchCupones();
}, []);

  return (
    <div className="page-container">
      <section className={estilos.container}>
        <header className={estilos.header}>
          <h1>Cupones Promocionales</h1>
        </header>

        {/* Estado de Carga */}
        {cargando && <p className={estilos.statusText}>Cargando cupones...</p>}

        {/* Mensaje de Error */}
        {error && <div className={estilos.errorMessage}>{error}</div>}

        {/* Sin cupones */}
        {!cargando && !error && cupones.length === 0 && (
          <p className={estilos.emptyText}>No hay cupones creados en la base de datos.</p>
        )}

        {/* Lista de Cupones */}
        {!cargando && !error && cupones.length > 0 && (
          <section className={estilos.listSection}>
            <div className={estilos.listHeader}>
              <h2 className={estilos.sectionTitle}>Cupones activos</h2>
              <span className={estilos.badge}>{cupones.length}</span>
            </div>

            <div className={estilos.grid}>
              {cupones.map(cupon => (
                <article key={cupon.id} className={estilos.card}>
                  <div className={estilos.cardContent}>
                    <span className={estilos.code}>{cupon.codigo}</span>
                    <span className={estilos.discount}>-{cupon.descuento}%</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </section>
    </div>
  );
}

export default Cupon;