import React from "react";

import Ramo from "../interfaces/Ramo";
interface PruebaCardProps {
  prueba: Ramo;
}

const PruebaCard: React.FC<PruebaCardProps> = ({ prueba: ramo }) => {
  const getRamoDaysInfo = (
    ramo: Ramo,
    days: (keyof Pick<
      Ramo,
      "lunes" | "martes" | "miercoles" | "jueves" | "viernes"
    >)[]
  ): { key: keyof Ramo; value: string }[] => {
    const result: { key: keyof Ramo; value: string }[] = [];

    days.forEach((day) => {
      const value = ramo[day];
      if (value && value !== "") {
        result.push({ key: day, value: value as string });
      }
    });

    return result;
  };
  const hour = getRamoDaysInfo(ramo, [
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
  ])[0].value;
  //console.log(ramo);

  return (
    <div className="bg-purple-300 p-4 rounded-lg shadow-lg text-white max-w-80 min-h-40">
      <h3 className="font-bold text-lg">{ramo.titulo}</h3>
      <p>Descripción: {ramo.tipoDeReunion}</p>
      <p>Fecha: {ramo.inicio.toString()}</p>
      <p>Hora: {hour}</p>
    </div>
  );
};

export default PruebaCard;
