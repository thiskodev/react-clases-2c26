import { useState } from "react";
import { Link } from "react-router-dom"; 
import BotonFavorito from "../BotonFavorito";

// Tenemos que traer el id como props para despues usarlo en el link
const Item = ({ id, title, price, image }) => {
  const [contador, setContador] = useState(0);

  const incrementar = () => setContador(contador + 1);
  const decrementar = () => { if (contador > 0) setContador(contador - 1)};

  return (
    <div>
      <h2>
        {title}: AR${price}
      </h2>
      <img src={image} alt={title} width="100" />
      
      <br />
      <Link to={`/producto/${id}`}>Ver detalle</Link>
      
      <br />
      <BotonFavorito />
      <button onClick={decrementar}> - </button>
      <p>{contador}</p>
      <button onClick={incrementar}> + </button>
    </div>
  );
};

export default Item;