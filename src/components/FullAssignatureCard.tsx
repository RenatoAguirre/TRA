import React from "react";
import Ramo from "../interfaces/Ramo";

interface RamoProps {
  ramo: Ramo;
  onSingleRamoDelete: (nrc: number) => void;
}

const FullAssignaureCard: React.FC<RamoProps> = ({
  ramo,
  onSingleRamoDelete,
}) => {
  const handleClick = () => {
    onSingleRamoDelete(ramo.nrc);
  };
  return (
    <div className="bg-blue-400 text-white p-4 rounded-lg mb-4 shadow-md max-w-80 min-h-40 ml-3 hover:bg-red-700">
      <button onClick={handleClick}>
        <h3 className="font-bold text-lg">{ramo.titulo}</h3>

        <p>Profesor: {ramo.profesor}</p>
        <p>NRC: {ramo.nrc}</p>
      </button>
    </div>
  );
};

export default FullAssignaureCard;
