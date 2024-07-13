import React from "react";

interface CellProps {
  children?: React.ReactNode;
}

const Cell: React.FC<CellProps> = ({ children }) => {
  return (
    <div className="border border-gray-300 p-2 min-h-16 flex items-center justify-center">
      {children ? children : ""}
    </div>
  );
};

export default Cell;
