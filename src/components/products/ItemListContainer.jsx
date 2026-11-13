import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSearch } from "../../context/SearchContext";
import ItemList from "./ItemList";
import estilos from "./ItemListContainer.module.css";

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Obtenemos el texto de búsqueda global desde el Header
  const { busqueda } = useSearch();

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const productosRef = collection(db, "productos");
        const resp = await getDocs(productosRef);

        const listaProductos = resp.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setProductos(listaProductos);
      } catch (err) {
        console.error("Error al obtener productos de Firestore:", err);
        setError("No se pudieron cargar los productos.");
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  // Filtramos los productos de Firestore segun lo escrito en la barra
  const productosFiltrados = productos.filter(prod =>
    prod.nombre?.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (cargando) {
    return <div className={estilos.statusMessage}>Cargando productos...</div>;
  }

  if (error) {
    return <div className={estilos.statusMessage}>Error: {error}</div>;
  }

  return (
    <section className={estilos.container}>
      <h1>Productos</h1>
      {productosFiltrados.length === 0 ? (
        <div className={estilos.statusMessage}>
          {busqueda
            ? `No se encontraron productos que coincidan con "${busqueda}".`
            : "No hay productos disponibles."}
        </div>
      ) : (
        <ItemList productos={productosFiltrados} />
      )}
    </section>
  );
};

export default ItemListContainer;