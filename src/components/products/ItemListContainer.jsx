import { useState, useEffect } from "react";
import ItemList from "./ItemList"

const ItemListContainer = () => {
  
  const [productos, setProductos] = useState([]);
  const [cargando,setCargando] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => {
        if(!res.ok)
          throw new error("No se pudo cargar productos")

        return res.json()
        })
      .then(datos => setProductos(datos))
      .catch(error => setErrot(error.message))
      .finally(()=> setCargando(false))
  },[])
  
  return <ItemList productos ={productos} />
}

export default ItemListContainer;