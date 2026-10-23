import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import ItemList from '../components/products/ItemList';

const Categorias = () => {
  const { idCategoria } = useParams(); 
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        setCargando(true);
        
        // Obtenemos todos los productos
        const querySnapshot = await getDocs(collection(db, 'productos'));
        const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Filtramos en el cliente ignorando mayúsculas y minúsculas
        const productosFiltrados = docs.filter(
          prod => prod.categoria?.toLowerCase() === idCategoria?.toLowerCase()
        );

        setProductos(productosFiltrados);
      } catch (error) {
        console.error("Error al cargar los productos de la categoría:", error);
      } finally {
        setCargando(false); 
      }
    };

    if (idCategoria) {
      fetchCategorias();
    }
  }, [idCategoria]);

  return (
    <div>
      <h1 style={{ textTransform: 'capitalize' }}>{idCategoria}</h1>
      {cargando ? (
        <p>Cargando productos...</p>
      ) : productos.length === 0 ? (
        <p>No hay productos en esta categoría.</p>
      ) : (
        <ItemList productos={productos}/>
      )}
    </div>
  );
};

export default Categorias;