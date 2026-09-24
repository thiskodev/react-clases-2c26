import { Routes, Route } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import ItemListContainer from "./components/products/ItemListContainer";
import DetalleProducto from "./components/products/DetalleProducto";
import './App.css';

const App = () => {
   return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<h1>Inicio</h1>}/>
          <Route path='/contacto' element={<h1>Contacto</h1>}/>
          <Route path='/productos' element={<ItemListContainer />} />
          <Route path="/producto/:id" element={<DetalleProducto/>} />
        </Route>
      </Routes>
    </>   
  );
}

export default App;