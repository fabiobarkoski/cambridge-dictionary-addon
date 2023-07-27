import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faS, faSearch } from "@fortawesome/free-solid-svg-icons";
import SelectLanguage from "./SelectLanguage";
import type { FormProps } from "../types";
library.add(faS, faSearch);

const Form = (props: FormProps): React.JSX.Element => {
  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    localStorage.setItem("translation", props.translation);
    const windowFeatures = "popup,width=400, height=720";
    const url = `https://dictionary.cambridge.org/dictionary/${props.translation}/${props.word}`;
    if (!props.arrayWords.some((w) => w.word === props.word)) {
      const newArray = props.arrayWords.concat([
        { word: props.word, url: url },
      ]);
      if (newArray.length > 10) {
        newArray.splice(0, 1);
      }
      props.setArrayWords(newArray);
      localStorage.setItem("words", JSON.stringify(newArray));
    }
    props.setWord("");
    window.open(url, "Cambridge Dictionary", windowFeatures);
  };

  return (
    <form onSubmit={handleSubmit} className="flex-auto mb-4" role="form">
      <input
        className="rounded-l-full p-2 outline-none"
        name="word"
        value={props.word}
        onChange={(event) => {
          props.setWord(event.target.value);
        }}
      />
      <SelectLanguage
        translation={props.translation}
        setTranslation={props.setTranslation}
      />
      <button className="bg-[#fec400] rounded-full p-2 w-10" type="submit">
        <FontAwesomeIcon icon={["fas", "search"]} />
      </button>
    </form>
  );
};

export default Form;
