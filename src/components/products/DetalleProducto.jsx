import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DetalleProducto = () => {
  const { id } = useParams();
  
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Fetch que se ejecuta cada vez que cambie el ID
  useEffect(() => {
    setCargando(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('No se encontró el producto');
        return res.json();
      })
      .then((datos) => setProducto(datos))
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) return <p>Cargando detalle del producto...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <div className="producto-detalle">
      <h2>{producto.title}</h2>
      <img src={producto.image} alt={producto.title} width="200" />
      <p><strong>Categoría:</strong> {producto.category}</p>
      <p><strong>Precio:</strong> AR${producto.price}</p>
      <p><strong>Descripción:</strong> {producto.description}</p>
    </div>
  );
};

export default DetalleProducto;