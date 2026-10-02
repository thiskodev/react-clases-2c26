import { useCarrito } from '../context/CarritoContext';

const Carrito = () => {
  const { carrito, vaciarCarrito, cobroTotal } = useCarrito();

  if (carrito.length === 0) {
    return (
      <div>
        <h1>El carrito está vacío</h1>
        <p>Agrega productos para continuar la compra.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Carrito de Compras</h1>
      {carrito.map(item => (
        <div key={item.id} className="carrito-item" style={{ marginBottom: '1rem' }}>
          {item.image && <img src={item.image} alt={item.nombre} width="60" />}
          
          <h4>{item.nombre}</h4>
          <p>Cantidad: {item.cantidad}</p>
          <p>Precio unitario: ${item.precio}</p>
          <p>Subtotal: ${(item.precio * item.cantidad).toFixed(2)}</p>
        </div>
      ))}
      <hr />
      <h3>Total a pagar: ${cobroTotal().toFixed(2)}</h3>
      <button onClick={vaciarCarrito}>Vaciar Carrito</button>
    </div>
  );
};

export default Carrito;
