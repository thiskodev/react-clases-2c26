import estilo from "./Titulos.module.css"

const Titulos = ({children}) => {
  return(
    <div className={estilo.contenedor}>
      {children}
    </div>
  )
}

export default Titulos