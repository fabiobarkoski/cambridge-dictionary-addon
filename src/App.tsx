import React from "react";
import type { SearchedWord } from "./types";
import WordList from "./components/WordList";
import Form from "./components/Form";
import Header from "./components/Header";

const App = (): React.JSX.Element => {
  const LocalStorage = (item: string): string => {
    const itemValue = localStorage.getItem(item);
    if (!itemValue) {
      localStorage.setItem(
        item,
        item === "words" ? JSON.stringify([]) : "english",
      );
      return LocalStorage(item);
    }
    return itemValue;
  };

  const [translation, setTranslation] = React.useState<string>(
    LocalStorage("translation"),
  );
  const [arrayWords, setArrayWords] = React.useState<SearchedWord[]>(
    JSON.parse(LocalStorage("words")),
  );
  const [word, setWord] = React.useState("");

  const excludeWord = (wordToExclude: SearchedWord): void => {
    const arrayWithoutWord = arrayWords.filter((w) => w !== wordToExclude);
    setArrayWords(arrayWithoutWord);
    localStorage.setItem("words", JSON.stringify(arrayWithoutWord));
  };

  const openAsPopup = (url: string): void => {
    const windowFeatures = "popup,width=400, height=720";
    window.open(url, "Cambridge Dictionary", windowFeatures);
  };

  return (
    <>
      <div className="container divide-y divide-gray-500">
        <Header />
        <div className="bg-dark-camb pl-2 pr-2 pb-8 pt-2">
          <Form
            word={word}
            setWord={setWord}
            translation={translation}
            setTranslation={setTranslation}
            arrayWords={arrayWords}
            setArrayWords={setArrayWords}
          />
          <WordList
            arrayWords={arrayWords}
            handleExclusion={excludeWord}
            handlePopUp={openAsPopup}
          />
        </div>
      </div>
    </>
  );
};

export default App;
