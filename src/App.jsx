import Layout from "./components/layouts/Layout";
import FormProductContainer from "./components/products/FormProductoContainer";
import ItemListContainer from "./components/products/ItemListContainer";

const App = () => {
  return (
    <>
      <Layout>
        <h1>La Futreria del Abuelo</h1>
        <FormProductContainer />
        <ItemListContainer />
      </Layout>
    </>
  );
}

export default App;