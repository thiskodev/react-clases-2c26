import { Routes, Route } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import ItemListContainer from "./components/products/ItemListContainer";
import DetalleProducto from "./components/products/DetalleProducto";
import Productos from "./components/products/Productos";
import Carrito from "./pages/Carrito";
import Categorias from "./pages/Categorias";
import './App.css';
import Cupon from "./components/Cupon";

const App = () => {
   return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Productos/>}/>
          <Route path='/contacto' element={<Cupon/>}/>
          <Route path='/productos' element={<ItemListContainer />} />
          <Route path="/producto/:id" element={<DetalleProducto/>} />
          <Route path="/:idCategoria" element={<Categorias/>} />
          <Route path="/carrito" element={<Carrito />} /> 
        </Route>
      </Routes>
    </>   
  );
}

export default App;