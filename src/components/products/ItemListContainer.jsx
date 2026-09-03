import ItemList from "./ItemList"

const ItemListContainer = () => {
  const items = [
    {id:1, nombre:"Manzanas", precio:3500},
    {id:2, nombre:"Peras", precio: 3000},
    {id:3, nombre:"Naranja", precio: 2500},
    {id:4, nombre:"Mango", precio:4000}
  ]
               
  return <ItemList productos ={items} />
}

export default ItemListContainer;