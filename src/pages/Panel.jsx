import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import FormProductContainer from '../components/products/FormProductoContainer';
import Cupon from '../components/Cupon';

const Panel = () => {
  const [productos, setProductos] = useState([]);

  // Carga inicial de productos desde Firestore
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productosRef = collection(db, "productos");
        const resp = await getDocs(productosRef);
        setProductos(
          resp.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        );
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProductos();
  }, []);


  const eliminarProducto = async (id) => {
    const confirmacion = window.confirm("¿Está seguro de que desea eliminar este producto?");
    if (confirmacion) {
      try {
        const docRef = doc(db, "productos", id);
        await deleteDoc(docRef);
        // Actualizamos el estado local para quitarlo de la lista en la UI
        setProductos(productos.filter((prod) => prod.id !== id));
        alert("Producto eliminado.");
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        alert("Hubo un error al intentar eliminar el producto.");
      }
    }
  };

  return (
    <>
      <h2>Panel de Administración</h2>
      {/* Formulario de producto */}
      <FormProductContainer />
      
      <hr />

      {/* Listado de productos */}
      <h3>Lista de Productos</h3>
      <ul>
        {productos.map(prod => (
          <li key={prod.id} style={{ marginBottom: '8px' }}>
            {prod.nombre} - ${prod.precio}
            <button 
              onClick={() => eliminarProducto(prod.id)} 
              style={{ marginLeft: '10px' }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <hr />

      <Cupon />
    </>
  );
};

export default Panel;