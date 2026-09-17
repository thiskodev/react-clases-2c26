const FormProducto = (
  { manejarCambio,
    manejarEnvio,
    manejarCambioImagen, 
    datosForm 
  }) => {
  return (
    <form onSubmit={manejarEnvio}>
      <h3>Agregar Nuevo Producto</h3>
      <div>
        <label>Nombre:</label>
        <input 
          name="nombre"
          type="text" 
          value={datosForm.nombre} 
          onChange={manejarCambio} 
        />
      </div>
      <div>
        <label>Precio:</label>
        <input
          name="precio"
          type="number"
          value={datosForm.precio}
          onChange={manejarCambio}
        />
      </div>
      <div>
        <label>Stock:</label>
        <input 
          name="stock"
          type="number" 
          value={datosForm.stock} 
          onChange={manejarCambio} 
        />
      </div>
      <div>
        <label>Imagen:</label>
        <input 
          name="imagen"
          type="file"
          onChange={manejarCambioImagen} 
        />
      </div>
      <button type="submit">Guardar Producto</button>
    </form>
  );
};

export default FormProducto;
