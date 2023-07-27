import React from "react";

export interface SearchedWord {
  word: string;
  url: string;
}

export interface FormProps {
  word: string;
  setWord: React.Dispatch<React.SetStateAction<string>>;
  translation: string;
  setTranslation: React.Dispatch<React.SetStateAction<string>>;
  arrayWords: SearchedWord[];
  setArrayWords: React.Dispatch<React.SetStateAction<SearchedWord[]>>;
}

export interface WordListProps {
  arrayWords: SearchedWord[];
  handleExclusion: Function;
  handlePopUp: Function;
}

export type SelectLanguageProps = Pick<
  FormProps,
  "translation" | "setTranslation"
>;

export type WordProps = Pick<WordListProps, "handlePopUp"> & {
  w: SearchedWord;
};

export type ExcludeWordProps = Pick<WordProps, "w"> & {
  handleExclusion: Function;
};
