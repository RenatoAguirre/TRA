import React from "react";
import useExcelReader from "../hooks/useExcelReader";

const RamosList: React.FC = () => {
  const { ramos } = useExcelReader();
  ramos.map((ramo) => {
    console.log(ramo);
  });

  return (
    <div className="p-4 h-full overflow-auto">
      {ramos.length > 0 ? (
        <div className="mt-4">
          <h2 className="font-bold text-xl mb-2">Ramos Cargados:</h2>
          <ul className="list-disc pl-5">
            {ramos &&
              ramos.map((ramo, index) => (
                <li key={index} className="mb-2">
                  <div className="p-2 border rounded bg-blue-100">
                    <p>
                      <strong>Título:</strong> {ramo.titulo}
                    </p>
                    <p>
                      <strong>NRC:</strong> {ramo.nrc}
                    </p>
                    <p></p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <p>Cargando ramos...</p>
      )}
    </div>
  );
};

export default RamosList;
