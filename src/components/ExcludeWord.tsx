import React from "react";
import type { ExcludeWordProps } from "../types";

const ExcludeWord = ({
  handleExclusion,
  w,
}: ExcludeWordProps): React.JSX.Element => {
  return (
    <svg
      className="w-6 h-6 stroke-red-500 stroke-1 hover:stroke-2"
      role="cross-mark"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      onClick={() => handleExclusion(w)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

export default ExcludeWord;
