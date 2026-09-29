import { useState, useEffect } from "react";
import ItemList from "./ItemList";
import estilos from "./ItemListContainer.module.css";

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/')
      .then(res => {
        if (!res.ok) throw new Error("No se pudo cargar productos");
        return res.json();
      })
      .then(datos => setProductos(datos))
      .catch(err => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) 
    return <div className={estilos.statusMessage}>Cargando productos...</div>;
  

  if (error) 
    return <div className={estilos.statusMessage}>Error: {error}</div>;
  

  return (
    <section className={estilos.container}>
      <h1>Productos</h1>
      <ItemList productos={productos} />
    </section>
  );
};

export default ItemListContainer;