import { useState, useEffect } from 'react';
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  getCountFromServer,
} from 'firebase/firestore';

export const usePaginacion = ({
  db,
  nombreColeccion,
  tamanoPagina = 6,
  campoOrden = 'nombre',
  direccionOrden = 'asc',
}) => {
  const [elementos, setElementos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [cargando, setCargando] = useState(true);

  // Guardamos en un objeto el ultimo documento de cada página.
  // Ejemplo: { 1: ultimoDocDeLaPagina1, 2: ultimoDocDeLaPagina2 }
  const [ultimosDocs, setUltimosDocs] = useState({});

  // Contador simple para volver a ejecutar los useEffect cuando agregas o borras algo
  const [recargarContador, setRecargarContador] = useState(0);

  // Limpiamos los datos guardados y fuerza una recarga
  const recargar = () => {
    setUltimosDocs({});
    setRecargarContador((anterior) => anterior + 1);
  };

  // Calculamos cuantas paginas existen en total
  useEffect(() => {
    const calcularTotalPaginas = async () => {
      try {
        const coleccionRef = collection(db, nombreColeccion);
        const snapshot = await getCountFromServer(coleccionRef);
        const totalProductos = snapshot.data().count;

        // Dividimos el total de productos por el tamaño de página y redondeamos hacia arriba
        const paginas = Math.max(1, Math.ceil(totalProductos / tamanoPagina));
        setTotalPaginas(paginas);

        // Si borramos productos y quedamos en una página que ya no existe, volvemos a la última válida
        if (paginaActual > paginas) {
          setPaginaActual(paginas);
        }
      } catch (error) {
        console.error('Error al contar los productos:', error);
      }
    };

    calcularTotalPaginas();
  }, [db, nombreColeccion, tamanoPagina, recargarContador, paginaActual]);

  // Traer los productos de la pagina actual
  useEffect(() => {
    const traerProductosDeLaPagina = async () => {
      setCargando(true);
      try {
        const coleccionRef = collection(db, nombreColeccion);
        let consulta;

        if (paginaActual === 1) {
          // Si es la pagina 1, traemos los primeros desde el principio
          consulta = query(
            coleccionRef,
            orderBy(campoOrden, direccionOrden),
            limit(tamanoPagina)
          );
        } else {
          // Si es otra página (ej. página 2), necesitamos el último documento de la pagina anterior (ej. pagina 1)
          let documentoAnterior = ultimosDocs[paginaActual - 1];

          // Si el usuario saltó directo a una pagina lejana (ej. de la 1 a la 4),
          // recorremos desde la 1 hasta la página anterior para conseguir ese documento
          if (!documentoAnterior) {
            let docPaso = null;
            for (let p = 1; p < paginaActual; p++) {
              const consultaPaso = docPaso
                ? query(coleccionRef, orderBy(campoOrden, direccionOrden), startAfter(docPaso), limit(tamanoPagina))
                : query(coleccionRef, orderBy(campoOrden, direccionOrden), limit(tamanoPagina));

              const snapPaso = await getDocs(consultaPaso);
              docPaso = snapPaso.docs[snapPaso.docs.length - 1];
            }
            documentoAnterior = docPaso;
          }

          // Armamos la consulta empezando DESPUES (startAfter) del último documento de la página anterior
          consulta = query(
            coleccionRef,
            orderBy(campoOrden, direccionOrden),
            startAfter(documentoAnterior),
            limit(tamanoPagina)
          );
        }

        const snapshot = await getDocs(consulta);

        // Transformamos los documentos de Firestore a un array normal de JavaScript
        const listaProductos = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setElementos(listaProductos);

        // Guardamos cual fue el último producto de esta página por si después vamos a la siguiente
        if (snapshot.docs.length > 0) {
          const ultimoDocDeEstaPagina = snapshot.docs[snapshot.docs.length - 1];
          setUltimosDocs((anteriores) => ({
            ...anteriores,
            [paginaActual]: ultimoDocDeEstaPagina,
          }));
        }
      } catch (error) {
        console.error('Error al traer la página:', error);
      } finally {
        setCargando(false);
      }
    };

    traerProductosDeLaPagina();
  }, [db, nombreColeccion, paginaActual, tamanoPagina, campoOrden, direccionOrden, recargarContador]);

  // Funciones para cambiar de página desde los botones
  const irAPagina = (numeroPagina) => {
    if (numeroPagina >= 1 && numeroPagina <= totalPaginas) {
      setPaginaActual(numeroPagina);
    }
  };

  const paginaSiguiente = () => irAPagina(paginaActual + 1);
  const paginaAnterior = () => irAPagina(paginaActual - 1);

  return {
    elementos,
    setElementos,
    paginaActual,
    totalPaginas,
    cargando,
    irAPagina,
    paginaSiguiente,
    paginaAnterior,
    recargar,
  };
};
