// src/hooks/useExcelReader.tsx
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Ramo from "../interfaces/Ramo";

const colorNames300 = [
  "red-300",
  "pink-300",
  "purple-300",
  "violet-300",
  "indigo-300",
  "blue-300",
  "sky-300",
  "cyan-300",
  "teal-300",
  "emerald-300",
  "green-300",
  "lime-300",
  "yellow-300",
  "amber-300",
  "orange-300",
];

function getRandomColor() {
  return colorNames300[Math.floor(Math.random() * colorNames300.length)];
}

const useExcelReader = () => {
  const [ramos, setRamos] = useState<Ramo[]>([]);
  

  useEffect(() => {
    const fetchExcel = async () => {
      const response = await fetch("/TRA/Horario20252test.xlsx");
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(new Uint8Array(arrayBuffer), {
        type: "array",
      });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      console.log(sheet);
      const data: Ramo[] = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        defval: "",
        raw: false, //importante para pasar las fechas formateadas
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const excelData = data.slice(12).map((row: any) => {
        //console.log(row);
        // the slice(13) is to remove the first 13 rows of the excel file
        // console.log(row);
        return {
          area: row[0],
          planDeEstudio: row[1],
          nrc: row[2],
          conectorLiga: row[3],
          listaCruzada: row[4],
          materia: row[5],
          curso: row[6],
          seccion: row[7],
          titulo: row[8],
          lunes: row[9],
          martes: row[10],
          miercoles: row[11],
          jueves: row[12],
          viernes: row[13],
          inicio: row[14],
          fin: row[15],
          sala: row[16],
          tipoDeReunion: row[17],
          profesor: row[18],
          color: getRandomColor(),
        };
      });

      setRamos(excelData);
    };

    fetchExcel();
  }, []);

  return { ramos };
};

export default useExcelReader;
