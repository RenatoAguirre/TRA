// src/hooks/useExcelReader.tsx
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

interface Register {
  area: string;
  planDeEstudio: string;
  nrc: number;
  materia: string;
  seccion: number;
  listaCruzada: string;
  titulo: string;
  lunes?: string;
  martes?: string;
  miercoles?: string;
  jueves?: string;
  viernes?: string;
  inicio: Date;
  fin: Date;
  tipoDeReunion: string;
  profesor: string;
}

const useExcelReader = () => {
  const [ramos, setRamos] = useState<Register[]>([]);

  useEffect(() => {
    const fetchExcel = async () => {
      const response = await fetch("/HORARIO+ING_202420.xlsx");
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(new Uint8Array(arrayBuffer), {
        type: "array",
      });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      console.log(sheet);
      const data: Register[] = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        defval: "",
        raw: false, //importante para pasar las fechas formateadas
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const excelData = data.slice(13).map((row: any) => {
        console.log(row);
        // the slice(13) is to remove the first 13 rows of the excel file
        // console.log(row);
        //console.log(new Date(row[13] * 31556926).toUTCString());
        return {
          area: row[0],
          planDeEstudio: row[1],
          nrc: row[2],
          materia: row[3],
          seccion: row[4],
          listaCruzada: row[5],
          titulo: row[6],
          lunes: row[7],
          martes: row[8],
          miercoles: row[9],
          jueves: row[10],
          viernes: row[11],
          inicio: row[12],
          fin: row[13],
          tipoDeReunion: row[14],
          profesor: row[15],
        };
      });

      setRamos(excelData);
    };

    fetchExcel();
  }, []);

  return { ramos };
};

export default useExcelReader;
