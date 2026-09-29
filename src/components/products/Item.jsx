import { useState } from "react";
import { Link } from "react-router-dom"; 
import BotonFavorito from "../BotonFavorito";
import styles from "./Item.module.css";

const Item = ({ id, title, price, image }) => {
  const [contador, setContador] = useState(0);

  const incrementar = () => setContador(contador + 1);
  const decrementar = () => { if (contador > 0) setContador(contador - 1); };

  return (
    <article className={styles.card}>
      {/* Clic en la image te lleva al detalle */}
      <Link to={`/producto/${id}`} className={styles.imageLink}>
        <img src={image} alt={title} className={styles.image} />
      </Link>
      
      {/* Clic en el título / price te lleva al detalle */}
      <Link to={`/producto/${id}`} className={styles.titleLink}>
        <h2 className={styles.title}>{title}</h2>
      </Link>
      <p className={styles.price}>AR${price}</p>
      
      <div className={styles.actions}>
        <BotonFavorito />
        
        <div className={styles.counter}>
          <button onClick={decrementar} className={styles.counterBtn}>-</button>
          <span className={styles.countText}>{contador}</span>
          <button onClick={incrementar} className={styles.counterBtn}>+</button>
        </div>
      </div>
    </article>
  );
};

export default Item;