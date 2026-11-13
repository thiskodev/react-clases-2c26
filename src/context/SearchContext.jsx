import { createContext, useState, useContext } from "react";

const SearchContext = createContext();
// Custom Hook
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context)
    throw new Error("useSearch debe ser usado dentro de un SearchProvider");
  return context;
};

export const SearchProvider = ({ children } ) => {
  const [busqueda, setBusqueda] = useState("");

  return (
    <SearchContext.Provider value={{ busqueda, setBusqueda }}>
      {children}
    </SearchContext.Provider>
  );
}

