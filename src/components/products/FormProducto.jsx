const FormProducto = (
  { manejarCambio,
    manejarEnvio,
    manejarCambioImagen, 
    datosForm, 
    cargando
  }) => {
  return (
    <form onSubmit={manejarEnvio}>
      <h3>Nuevo Producto</h3>
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
        <label>Categoría:</label>
        <select 
          name="categoria" 
          value={datosForm.categoria || ""} 
          onChange={manejarCambio}
        >
          <option value="" disabled>Selecciona categoría</option>
          <option value="mujer">Mujer</option>
          <option value="hombre">Hombre</option>
          <option value="kids">Kids</option>
        </select>
      </div>
      <div>
        <label>Descripcion:</label>
        <textarea
          name="descripcion"
          type="text" 
          value={datosForm.descripcion} 
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
      <button type="submit" disabled={cargando}>
        {cargando ? "Guardando..": "Guardar Producto"}
      </button>
    </form>
  );
};

export default FormProducto;
