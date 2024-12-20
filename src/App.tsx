/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import "./App.css";
import Schedule from "./components/Schedule";
import Search from "./components/Search";
import RamoContainer from "./components/AssignatureContainer";
//import RamosList from "./components/RamosList";
import useExcelReader from "./hooks/useExcelReader";
import Ramo from "./interfaces/Ramo";
import PruebaContainer from "./components/TestCointainer";

function App(): JSX.Element {
  const { ramos } = useExcelReader();
  //console.log(ramos);
  const [selectedRamos, setSelectedRamos] = useState<Ramo[]>([]);
  const [possibleScheduleRegisters, setPossibleScheduleRegisters] = useState<
    Ramo[]
  >([]);

  const handleRamoSelect = (selectedRamo: Ramo) => {
    if (
      !selectedRamos.some((register: Ramo) => register.nrc === selectedRamo.nrc)
    ) {
      setSelectedRamos([...selectedRamos, selectedRamo]);
      //console.log(selectedRamos);
    }
  };
  const handleSingleRamoDelete = (nrc: number) => {
    if (selectedRamos.length === 1) {
      setSelectedRamos([]);
    } else {
      setSelectedRamos(selectedRamos.filter((ramo) => ramo.nrc !== nrc));
    }
  };

  const handleAllRamosDelete = () => {
    setSelectedRamos([]);
  };

  /*
  const allRegistersFromSelectedRamos = ramos.filter((ramo) =>
    selectedRamos.some((selectedRamo) => selectedRamo.nrc === ramo.nrc)
  );
  */

  useEffect(() => {
    setPossibleScheduleRegisters(
      schedulePosibleRegistersFromSelectedRamos(ramos, selectedRamos)
    );
    console.log(selectedRamos);
  }, [selectedRamos]);

  const schedulePosibleRegistersFromSelectedRamos = (
    ramos: Ramo[],
    selectedRamos: Ramo[]
  ) => {
    return ramos.filter((ramo) => {
      return selectedRamos.some((selectedRamo) => {
        return (
          selectedRamo.nrc === ramo.nrc &&
          (ramo.tipoDeReunion === "CLAS" ||
            ramo.tipoDeReunion === "LABT" ||
            ramo.tipoDeReunion === "AYUD")
        );
      });
    }, selectedRamos);
  };
  const testsFromSelectedRamos = (selectedRamos: Ramo[], ramos: Ramo[]) => {
    return ramos.filter((ramo) => {
      return selectedRamos.some((selectedRamo) => {
        return (
          selectedRamo.nrc === ramo.nrc && ramo.tipoDeReunion.startsWith("PRBA")
        );
      });
    });
  };
  const examsFromSelectedRamos = (selectedRamos: Ramo[], ramos: Ramo[]) => {
    return ramos.filter((ramo) => {
      return selectedRamos.some((selectedRamo) => {
        return (
          selectedRamo.nrc === ramo.nrc && ramo.tipoDeReunion.startsWith("EXAM")
        );
      });
    });
  };
  const tests = testsFromSelectedRamos(selectedRamos, ramos);

  const exams = examsFromSelectedRamos(selectedRamos, ramos);

  //console.log(tests);
  return (
    <>
      <Search ramos={ramos} onRamoSelect={handleRamoSelect} />
      <div className="flex container mx-auto mt-5 justify-between items-stretch">
        <Schedule selectedRamos={possibleScheduleRegisters} />
        <RamoContainer
          ramos={selectedRamos}
          onAllRamoDelete={handleAllRamosDelete}
          onSingleRamoDelete={handleSingleRamoDelete}
        />
      </div>
      <div className="flex container justify-between space-x-5">
        <PruebaContainer pruebas={tests} title="Pruebas" />
        <PruebaContainer pruebas={exams} title="Examenes" />
      </div>
    </>
  );
}

export default App;
