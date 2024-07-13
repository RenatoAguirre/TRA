import React, { useState } from "react";
import "./App.css";
import Schedule from "./components/Schedule";
import Search from "./components/Search";
import RamoContainer from "./components/AssignatureContainer";
//import RamosList from "./components/RamosList";
import useExcelReader from "./hooks/useExcelReader";
import Ramo from "./interfaces/Ramo";

function App(): JSX.Element {
  const { ramos } = useExcelReader();
  const [selectedRamos, setSelectedRamos] = useState<Ramo[]>([]);

  const handleRamoSelect = (selectedRamo: Ramo) => {
    if (
      !selectedRamos.some((register: Ramo) => register.nrc === selectedRamo.nrc)
    ) {
      setSelectedRamos([...selectedRamos, selectedRamo]);
      //console.log(selectedRamos);
    }
  };
  const handleSingleRamoDelete = (nrc: number) => {
    setSelectedRamos(selectedRamos.filter((ramo) => ramo.nrc !== nrc));
  };

  const handleAllRamosDelete = () => {
    setSelectedRamos([]);
  };

  /*
  const allRegistersFromSelectedRamos = ramos.filter((ramo) =>
    selectedRamos.some((selectedRamo) => selectedRamo.nrc === ramo.nrc)
  );
  */

  const schedulePosibleRegistersFromSelectedRamos = ramos.filter((ramo) => {
    return selectedRamos.some((selectedRamo) => {
      return (
        selectedRamo.nrc === ramo.nrc &&
        (ramo.tipoDeReunion === "CLAS" ||
          ramo.tipoDeReunion === "LABT" ||
          ramo.tipoDeReunion === "AYUD")
      );
    });
  });
  console.log("a", schedulePosibleRegistersFromSelectedRamos);
  return (
    <>
      <Search ramos={ramos} onRamoSelect={handleRamoSelect} />
      <div className="flex container mx-auto mt-5 justify-between items-stretch">
        <Schedule selectedRamos={schedulePosibleRegistersFromSelectedRamos} />
        <RamoContainer
          ramos={selectedRamos}
          onAllRamoDelete={handleAllRamosDelete}
          onSingleRamoDelete={handleSingleRamoDelete}
        />
      </div>
    </>
  );
}

export default App;
