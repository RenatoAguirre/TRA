import React from "react";
import FullAssignatureCard from "./FullAssignatureCard";
import Ramo from "../interfaces/Ramo";

interface RamoContainerProps {
  ramos?: Ramo[];
  onAllRamoDelete: () => void;
  onSingleRamoDelete: (nrc: number) => void;
}

const RamoContainer: React.FC<RamoContainerProps> = ({
  ramos = [],
  onAllRamoDelete,
  onSingleRamoDelete,
}) => {
  const handleClick = () => {
    onAllRamoDelete();
  };
  return (
    <div className="max-h-screen overflow-y-auto p-4 border border-gray-300 rounded-lg min-w-96 align-center">
      <h2 className="font-bold text-xl mb-4">Ramos</h2>
      <button onClick={handleClick}>Borrar todo</button>
      <hr className="mb-4" />
      {ramos.map((ramo, index) => (
        <FullAssignatureCard
          key={index}
          ramo={ramo}
          onSingleRamoDelete={onSingleRamoDelete}
        />
      ))}
    </div>
  );
};

export default RamoContainer;
