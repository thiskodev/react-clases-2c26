import styles from "./FormProducto.module.css";

const FormProducto = ({
  manejarCambio,
  manejarEnvio,
  manejarCambioImagen,
  datosForm,
  cargando,
  esEdicion,
  errores = {}
}) => {
  return (
    <form className={styles.formulario} onSubmit={manejarEnvio} noValidate>
      {/* Campo Nombre */}
      <div className={styles.grupoInput}>
        <label className={styles.label}>Nombre del producto</label>
        <input
          name="nombre"
          type="text"
          placeholder="Ej: Remera Classic Black"
          value={datosForm.nombre}
          onChange={manejarCambio}
          className={`${styles.input} ${errores.nombre ? styles.inputError : ""}`}
        />
        {errores.nombre && <span className={styles.mensajeError}>{errores.nombre}</span>}
      </div>

      {/* Campo Precio */}
      <div className={styles.grupoInput}>
        <label className={styles.label}>Precio (AR$)</label>
        <input
          name="precio"
          type="number"
          placeholder="Ej: 15000"
          value={datosForm.precio}
          onChange={manejarCambio}
          className={`${styles.input} ${errores.precio ? styles.inputError : ""}`}
        />
        {errores.precio && <span className={styles.mensajeError}>{errores.precio}</span>}
      </div>

      {/* Campo Stock */}
      <div className={styles.grupoInput}>
        <label className={styles.label}>Stock disponible</label>
        <input
          name="stock"
          type="number"
          placeholder="Ej: 10"
          value={datosForm.stock}
          onChange={manejarCambio}
          className={`${styles.input} ${errores.stock ? styles.inputError : ""}`}
        />
        {errores.stock && <span className={styles.mensajeError}>{errores.stock}</span>}
      </div>

      {/* Campo Categoría */}
      <div className={styles.grupoInput}>
        <label className={styles.label}>Categoría</label>
        <select
          name="categoria"
          value={datosForm.categoria || ""}
          onChange={manejarCambio}
          className={`${styles.select} ${errores.categoria ? styles.inputError : ""}`}
        >
          <option value="" disabled>Selecciona una categoría</option>
          <option value="mujer">Mujer</option>
          <option value="hombre">Hombre</option>
          <option value="kids">Kids</option>
        </select>
        {errores.categoria && <span className={styles.mensajeError}>{errores.categoria}</span>}
      </div>

      {/* Campo Descripción */}
      <div className={styles.grupoInput}>
        <label className={styles.label}>Descripción</label>
        <textarea
          name="descripcion"
          placeholder="Escribe los detalles del producto..."
          value={datosForm.descripcion}
          onChange={manejarCambio}
          className={`${styles.textarea} ${errores.descripcion ? styles.inputError : ""}`}
        />
        {errores.descripcion && <span className={styles.mensajeError}>{errores.descripcion}</span>}
      </div>

      {/* Campo Imagen */}
      <div className={styles.grupoInput}>
        <label className={styles.label}>
          {esEdicion ? "Cambiar Imagen (Opcional)" : "Imagen del Producto"}
        </label>
        <input
          name="imagen"
          type="file"
          accept="image/*"
          onChange={manejarCambioImagen}
          className={`${styles.input} ${errores.imagen ? styles.inputError : ""}`}
        />
        {errores.imagen && <span className={styles.mensajeError}>{errores.imagen}</span>}
        
        {/* Vista previa si ya existe una imagen en edición */}
        {esEdicion && datosForm.imagen && (
          <div>
            <span style={{ fontSize: "0.75rem", color: "#666" }}>Imagen actual:</span>
            <br />
            <img src={datosForm.imagen} alt="Vista previa" className={styles.previewImagen} />
          </div>
        )}
      </div>

      {/* Boton dinamico */}
      <button type="submit" className={styles.botonSubmit} disabled={cargando}>
        {cargando
          ? "Procesando..."
          : esEdicion
          ? "Guardar Cambios"
          : "Crear Producto"}
      </button>
    </form>
  );
};

export default FormProducto;
