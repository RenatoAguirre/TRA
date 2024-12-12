// src/hooks/useExcelReader.tsx
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Ramo from "../interfaces/Ramo";

const useExcelReader = () => {
  const [ramos, setRamos] = useState<Ramo[]>([]);

  useEffect(() => {
    const fetchExcel = async () => {
      const response = await fetch("/TRA/HORARIO+ING_202510.xlsx");
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(new Uint8Array(arrayBuffer), {
        type: "array",
      });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      //console.log(sheet);
      const data: Ramo[] = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        defval: "",
        raw: false, //importante para pasar las fechas formateadas
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const excelData = data.slice(13).map((row: any) => {
        //console.log(row);
        // the slice(13) is to remove the first 13 rows of the excel file
        // console.log(row);
        return {
          area: row[0],
          planDeEstudio: row[1],
          nrc: row[2],
          listaCruzada: row[3],
          materia: row[4],
          curso: row[5],
          seccion: row[6],
          titulo: row[7],
          lunes: row[8],
          martes: row[9],
          miercoles: row[10],
          jueves: row[11],
          viernes: row[12],
          inicio: row[13],
          fin: row[14],
          sala: row[15],
          tipoDeReunion: row[16],
          profesor: row[17],
        };
      });

      setRamos(excelData);
    };

    fetchExcel();
  }, []);

  return { ramos };
};

export default useExcelReader;
