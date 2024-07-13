import React from "react";

interface AssignatureCardProps {
  title: string;
  tipoDeReunion?: string;
}

const AssignatureCard: React.FC<AssignatureCardProps> = ({
  title,
  tipoDeReunion,
}) => {
  return (
    <div className="block p-1 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="flex flex-col">
        <div className="font-bold">{title}</div>
        <div>[{tipoDeReunion}]</div>
      </div>
    </div>
  );
};

export default AssignatureCard;
