import { db } from "../../firebase/config";
import { usePaginacion } from "../../hooks/usePaginacion";
import Paginacion from "../../components/Paginacion";

const Productos = () => {
  const {
    elementos: productos,
    paginaActual,
    totalPaginas,
    cargando,
    irAPagina,
  } = usePaginacion({
    db,
    nombreColeccion: "productos",
    tamanoPagina: 6,
    campoOrden: "nombre",
    direccionOrden: "asc",
  });

  if (cargando && productos.length === 0) {
    return <p>Cargando productos...</p>;
  }

  return (
    <div>
      <h1>Productos</h1>

      <div className="lista-productos">
        {productos.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          productos.map((prod) => (
            <div key={prod.id}>
              {prod.imagen && (
                <img
                  src={prod.imagen}
                  alt={prod.nombre}
                  style={{ width: "100px" }}
                />
              )}
              <h3>{prod.nombre}</h3>
              <p>Categoría: {prod.categoria}</p>
              <p>Precio: ${prod.precio}</p>
              <p>Stock: {prod.stock} unidades</p>
              <hr />
            </div>
          ))
        )}
      </div>

      <Paginacion
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        alCambiarPagina={irAPagina}
        deshabilitado={cargando}
      />
    </div>
  );
};

export default Productos;