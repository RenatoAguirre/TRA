import React from "react";

interface AssignatureCardProps {
  title: string;
  tipoDeReunion?: string;
  color: string;
}

// Explicit color mapping to ensure classes are included
const colorMap: Record<string, string> = {
  "red-300": "bg-red-300",
  "pink-300": "bg-pink-300",
  "purple-300": "bg-purple-300",
  "violet-300": "bg-violet-300",
  "indigo-300": "bg-indigo-300",
  "blue-300": "bg-blue-300",
  "sky-300": "bg-sky-300",
  "cyan-300": "bg-cyan-300",
  "teal-300": "bg-teal-300",
  "emerald-300": "bg-emerald-300",
  "green-300": "bg-green-300",
  "lime-300": "bg-lime-300",
  "yellow-300": "bg-yellow-300",
  "amber-300": "bg-amber-300",
  "orange-300": "bg-orange-300",
};

// Fallback: Direct hex color values
const colorHexMap: Record<string, string> = {
  "red-300": "#fca5a5",
  "pink-300": "#f9a8d4",
  "purple-300": "#d8b4fe",
  "violet-300": "#c4b5fd",
  "indigo-300": "#a5b4fc",
  "blue-300": "#93c5fd",
  "sky-300": "#7dd3fc",
  "cyan-300": "#67e8f9",
  "teal-300": "#5eead4",
  "emerald-300": "#6ee7b7",
  "green-300": "#86efac",
  "lime-300": "#bef264",
  "yellow-300": "#fde047",
  "amber-300": "#fcd34d",
  "orange-300": "#fdba74",
};

const AssignatureCard: React.FC<AssignatureCardProps> = ({
  title,
  tipoDeReunion,
  color,
}) => {
  console.log("Color received:", color);
  const colorClass = colorMap[color] || `bg-${color}` || "bg-gray-300";
  const fallbackColor = colorHexMap[color];
  console.log("Generated class:", colorClass);
  
  return (
    <div>
      <div 
        className={`${colorClass} block p-1 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-700`}
        style={fallbackColor ? { backgroundColor: fallbackColor } : {}}
      >
        <div className="flex flex-col">
          <div className="font-bold ">{title}</div>
          <div>[{tipoDeReunion}]</div>
        </div>
      </div>
    </div>
  );
};

export default AssignatureCard;
