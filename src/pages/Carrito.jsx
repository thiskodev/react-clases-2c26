import { useCarrito } from '../context/CarritoContext';

const Carrito = () => {
  const { 
    carrito, 
    vaciarCarrito, 
    eliminarDelCarrito, 
    incrementarCantidad, 
    decrementarCantidad, 
    cobroTotal 
  } = useCarrito();

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
        <div 
          key={item.id} 
          className="carrito-item" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem', 
            marginBottom: '1rem',
            borderBottom: '1px solid #ccc',
            paddingBottom: '1rem'
          }}
        >
          <img src={item.imagen || item.image} alt={item.nombre} width="60" />
          <div style={{ flexGrow: 1 }}>
            <h4>{item.nombre}</h4>
            <p>Precio unitario: ${item.precio}</p>
            <p>Subtotal: ${(item.precio * item.cantidad).toFixed(2)}</p>
          </div>

          {/* Controles de cantidad (+ / -) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button onClick={() => decrementarCantidad(item.id)}>-</button>
            <span>{item.cantidad}</span>
            <button onClick={() => incrementarCantidad(item.id)}>+</button>
          </div>

          {/* Botón con icono de papelera */}
          <button 
            onClick={() => eliminarDelCarrito(item.id)}
            title="Eliminar producto"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#ff4d4d',
              padding: '0.5rem'
            }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      ))}

      <hr />
      <h3>Total a pagar: ${cobroTotal().toFixed(2)}</h3>
      <button onClick={vaciarCarrito}>Vaciar Carrito</button>
    </div>
  );
};

export default Carrito;
