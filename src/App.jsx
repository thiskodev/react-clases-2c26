import Bienvenida from "./components/Bienvenida";
import Layout from "./components/layouts/Layout";

function App() {
  return (
    <>
      <Layout>
        <h1>React Talento Tech</h1>
        <Bienvenida />
      </Layout>
    </>
  );
}

export default App;