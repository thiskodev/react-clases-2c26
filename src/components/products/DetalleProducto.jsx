import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext';
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import styles from './DetalleProducto.module.css';

const DetalleProducto = () => {
  const { id } = useParams();
  const { agregarACarrito } = useCarrito();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      setCargando(true);
      try {
        const docRef = doc(db, "productos", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProducto({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("El producto no existe");
        }
      } catch (err) {
        console.error("Error al obtener producto:", err);
        setError("Error al cargar el producto");
      } finally {
        setCargando(false);
      }
    };

    fetchProducto();
  }, [id]);

  const manejarAgregarACarrito = () => {
    // Al venir directo de Firestore, las propiedades ya se llaman: nombre, precio e imagen
    agregarACarrito({ producto, cantidad: 1 });
  };

  if (cargando) return <div className={styles.statusContainer}>Cargando detalle del producto...</div>;
  if (error) return <div className={styles.statusContainer}>Error: {error}</div>;
  if (!producto) return <div className={styles.statusContainer}>Producto no encontrado</div>;

  return (
    <div className={styles.container}>
      <Link to="/productos" className={styles.backLink}>
        ← Volver a productos
      </Link>

      <div className={styles.grid}>
        <div className={styles.imageWrapper}>
          <img src={producto.imagen} alt={producto.nombre} className={styles.image} />
        </div>

        <div className={styles.infoSection}>
          <span className={styles.categoryTag}>{producto.categoria}</span>
          <h1 className={styles.title}>{producto.nombre}</h1>
          <p className={styles.price}>AR${producto.precio}</p>
          
          <h3 className={styles.descriptionTitle}>Descripción</h3>
          <p className={styles.description}>{producto.descripcion}</p>

          <button className={styles.buyButton} onClick={manejarAgregarACarrito}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;