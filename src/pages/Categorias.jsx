import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
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
        const q = query(
          collection(db, 'productos'), 
          where('categoria', '==', idCategoria)
        );
        
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProductos(docs);
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
      <h1>Categoría: {idCategoria}</h1>
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