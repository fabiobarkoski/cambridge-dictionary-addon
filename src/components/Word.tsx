import React from "react";
import type { WordProps } from "../types";

const Word = ({ w, handlePopUp }: WordProps): React.JSX.Element => {
  return (
    <p
      className="cursor-pointer hover:underline"
      onClick={() => handlePopUp(w.url)}
    >
      {w.word}
    </p>
  );
};

export default Word;
