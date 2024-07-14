import React from "react";
import PruebaCard from "./PruebaCard.tsx";
import Ramo from "../interfaces/Ramo.ts";

interface PruebaContainerProps {
  pruebas: Ramo[];
  title: string;
}

const PruebaContainer: React.FC<PruebaContainerProps> = ({
  pruebas,
  title,
}) => {
  return (
    <div className="max-h-screen overflow-y-auto mt-4 p-4 border border-gray-300 rounded-lg w-1/2">
      <h2 className="font-bold text-xl mb-4">{title}</h2>
      <hr className="mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pruebas.map((prueba, index) => (
          <PruebaCard key={index} prueba={prueba} />
        ))}
      </div>
    </div>
  );
};

export default PruebaContainer;
