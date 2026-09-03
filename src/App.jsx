import Bienvenida from "./components/Bienvenida";
import Layout from "./components/layouts/Layout";
import ItemListContainer from "./components/products/ItemListContainer";

const App = () => {
  return (
    <>
      <Layout>
        <h1>La Futreria del Abuelo</h1>
        <ItemListContainer />
      </Layout>
    </>
  );
}

export default App;