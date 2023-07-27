import React from "react";
import type { SelectLanguageProps } from "../types";

const SelectLanguage = ({
  translation,
  setTranslation,
}: SelectLanguageProps): React.JSX.Element => {
  return (
    <select
      className="rounded-r-full h-10 bg-white mr-1"
      name="chooseDictionary"
      value={translation}
      onChange={(event) => {
        setTranslation(event.target.value);
      }}
    >
      <optgroup label="Definitions">
        <option value="english">English</option>
        <option value="learner-english">Learner{"'"}s Dictionary</option>
        <option value="essential-british-english">
          Essential British English
        </option>
        <option value="essential-american-english">
          Essential American English
        </option>
      </optgroup>
      <optgroup label="Bilingual Dictionaries">
        <option value="english-dutch">English-Dutch</option>
        <option value="english-french">English-French</option>
        <option value="english-german">English-German</option>
        <option value="english-indonesian">English-Indonesian</option>
        <option value="english-italian">English-Italian</option>
        <option value="english-japanese">English-Japanese</option>
        <option value="english-norwegian">English-Norwegian</option>
        <option value="english-polish">English-Polish</option>
        <option value="english-portuguese">English-Portuguese</option>
        <option value="english-spanish">English-Spanish</option>
      </optgroup>
      <optgroup label="Semi-bilingual Dictionaries">
        <option value="english-arabic">English-Arabic</option>
        <option value="english-bengali">English-Bengali</option>
        <option value="english-catalan">English-Catalan</option>
        <option value="english-chinese-simplified">
          English-Chinese (Simplified)
        </option>
        <option value="english-chinese-traditional">
          English-Chinese (Traditional)
        </option>
        <option value="english-czech">English-Czech</option>
        <option value="english-danish">English-Danish</option>
        <option value="english-hindi">English-Hindi</option>
        <option value="english-korean">English-Korean</option>
        <option value="english-malay">English-Malay</option>
        <option value="english-marathi">English-Marathi</option>
        <option value="english-russian">English-Russian</option>
        <option value="english-thai">English-Thai</option>
        <option value="english-turkish">English-Turkish</option>
        <option value="english-ukrainian">English-Ukrainian</option>
        <option value="english-vietnamese">English-Vietnamese</option>
      </optgroup>
    </select>
  );
};

export default SelectLanguage;
