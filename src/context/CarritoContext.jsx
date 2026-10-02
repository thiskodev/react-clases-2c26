import { useState, useContext, createContext } from 'react';

export const CarritoContext = createContext();

// Custom Hook
export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) 
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');

  return context;
};

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarACarrito = ({ producto, cantidad = 1 }) => {
  const itemEnCarrito = carrito.find(item => item.id === producto.id);

  if (itemEnCarrito) {
    const carritoActualizado = carrito.map(item =>
      item.id === producto.id
        ? { ...item, cantidad: item.cantidad + cantidad }
        : item
    );
    setCarrito(carritoActualizado);
  } else {
    setCarrito(carritoPrevio => [...carritoPrevio, { ...producto, cantidad }]);
  }
};

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const itemsEnCarrito = () => {
    return carrito.reduce((acumulador, item) => acumulador + item.cantidad, 0);
  };

  const cobroTotal = () => {
    return carrito.reduce((acumulador, item) => acumulador + item.precio * item.cantidad, 0);
  };

  return (
    <CarritoContext.Provider value={{ 
      carrito, 
      agregarACarrito, 
      vaciarCarrito,
      itemsEnCarrito, 
      cobroTotal 
    }}>
      {children}
    </CarritoContext.Provider>
  );
};