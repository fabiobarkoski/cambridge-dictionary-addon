import React from "react";
import type { WordListProps } from "../types";
import ExcludeWord from "./ExcludeWord";
import Word from "./Word";

const WordList = ({
  arrayWords,
  handleExclusion,
  handlePopUp,
}: WordListProps): React.JSX.Element => {
  return (
    <ul className="list-inside grid grid-cols-2 gap-4" role="ul">
      {arrayWords.map((w) => (
        <li
          className="flex justify-between text-white bg-indigo-950/75 border-[12px] border-indigo-950/75"
          key={w.word}
          role="li"
        >
          <Word w={w} handlePopUp={handlePopUp} />
          <ExcludeWord handleExclusion={handleExclusion} w={w} />
        </li>
      ))}
    </ul>
  );
};

export default WordList;
