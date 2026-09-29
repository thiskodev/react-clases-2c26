import Item from "./Item";
import styles from "./ItemList.module.css";

const ItemList = ({ productos }) => {
  return (
    <div className={styles.grid}>
      {productos.map((producto) => (
        <Item key={producto.id} {...producto} />
      ))}
    </div>
  );
};

export default ItemList;