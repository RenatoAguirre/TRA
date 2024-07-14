import React, { useState, useMemo } from "react";
import Ramo from "../interfaces/Ramo";

interface SearchProps {
  ramos: Ramo[];
  onRamoSelect: (ramo: Ramo) => void; // Función para manejar la selección de un ramo
}

const Search: React.FC<SearchProps> = ({ ramos, onRamoSelect }) => {
  const [query, setQuery] = useState("");

  const filteredRamos = useMemo(() => {
    const uniqueNRCs = new Set<number>();
    return ramos.filter((ramo) => {
      const isMatch = ramo.titulo.toLowerCase().includes(query.toLowerCase());
      if (isMatch && !uniqueNRCs.has(ramo.nrc)) {
        uniqueNRCs.add(ramo.nrc);
        return true;
      }
      return false;
    });
  }, [query, ramos]);

  const handleClick = (ramo: Ramo) => {
    onRamoSelect(ramo);
    setQuery("");
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg"
        placeholder="Buscar ramo..."
      />
      {query && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 z-10 max-h-60 overflow-y-auto">
          {filteredRamos.length > 0 ? (
            filteredRamos.map((ramo, index) => (
              <li
                key={index}
                onClick={() => handleClick(ramo)}
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                <h1>{ramo.titulo}</h1>
                <p>{ramo.profesor}</p>
                <p>NRC: {ramo.nrc}</p>
                <hr />
              </li>
            ))
          ) : (
            <li className="p-2">No se encontraron resultados</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
