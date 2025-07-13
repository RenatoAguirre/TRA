import React from "react";
import Cell from "./Cell";
import Ramo from "../interfaces/Ramo";
import AssignatureCard from "./AssignatureCard";

const days = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
  "Domingo",
];
const times = [
  "08:30",
  "09:30",
  "10:30",
  "11:30",
  "12:30",
  "13:30",
  "14:30",
  "15:30",
  "16:30",
  "17:30",
  "18:30",
  "19:30",
];
const daysToCheck: (keyof Ramo)[] = [
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
];

interface RamoResumedData {
  title: string;
  day: string;
  hour: string;
  tipoDeReunion?: string;
  color: string;
}

const Schedule: React.FC<{ selectedRamos: Ramo[] | [] }> = ({
  selectedRamos,
}) => {
  const [ramos, setRamos] = React.useState<RamoResumedData[]>([]);

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

  const serializeRamos = () => {
    if (selectedRamos.length === 0) return;
    const SelectedRamosData = selectedRamos.map((Ramo) => {
      const data = getRamoDaysInfo(
        Ramo,
        daysToCheck as (
          | "lunes"
          | "martes"
          | "miercoles"
          | "jueves"
          | "viernes"
        )[]
      );
      const title = Ramo.titulo?.match(/\b(\w)/g)?.join("") || "";
      return {
        title,
        day: data[0].key,
        hour: data[0].value,
        tipoDeReunion: Ramo.tipoDeReunion,
        color: Ramo.color,
      };
    });
    console.log(SelectedRamosData);
    return SelectedRamosData;
  };

  React.useEffect(() => {
    const serializedRamos = serializeRamos();
    if (serializedRamos) {
      console.log(serializedRamos);
      setRamos(serializedRamos);
    } else {
      setRamos([]);
    }
  }, [selectedRamos]);

  //console.log(ramos);

  const filterRamos = (ramos: RamoResumedData[], day: string, time: string) => {
    const filteredRamos = ramos.filter((ramo) => {
      let [ hourStart, hourEnd ]= ramo.hour.split("-");
      //console.log(hourStart, hourEnd);

      // if (hourStart.endsWith("-")) {
      //   hourStart = hourStart.substring(0, 4);
      // }
      if (hourStart.length < 5) {
        hourStart = "0" + hourStart;
      }
      if (ramo.day.toLowerCase() == day.toLowerCase() && ramo.title.toLowerCase().startsWith("al")) {
        console.log(ramo.day, day, hourStart, hourEnd, time, ramo.day.toLowerCase() == day.toLowerCase() && hourStart <= time && hourEnd > time);
      }
      //console.log(ramo.day.toLowerCase() == day.toLowerCase() && hourStart <= time && hourEnd > time);
      return (
        ramo.day.toLowerCase() == day.toLowerCase() &&
        hourStart <= time &&
        hourEnd > time
      );
    });
    //console.log("filteredRamos", filteredRamos);
    return filteredRamos;
  };

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-8 gap-0">
        {/* Header */}
        <div className="col-span-1"></div>
        {days.map((day) => (
          <div
            key={day}
            className="border border-gray-300 p-2 font-bold text-center"
          >
            {day}
          </div>
        ))}

        {/* Time slots and cells */}
        {times.map((time) => (
          <React.Fragment key={time}>
            <div className="border border-gray-300 p-2 font-bold text-center">
              {time}
            </div>
            {days.map((day) => (
              <Cell key={`${day}-${time}`}>
                {ramos &&
                  filterRamos(ramos, day, time).map((ramo, index) => (
                    <AssignatureCard
                      key={index}
                      title={ramo.title}
                      tipoDeReunion={ramo.tipoDeReunion}
                      color={ramo.color}
                    />
                  ))}
              </Cell>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
