import Item from "./Item";

const ItemList = ({productos}) => {
  return(
    <>
    {productos.map(producto => (
      <Item key={producto.id} {...producto} />
    ))}
    </>
  );
}

export default ItemList