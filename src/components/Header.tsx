import React from "react";

const Header = (): React.JSX.Element => {
  return (
    <div className="flex bg-light-camb pl-2 pr-2 pb-4 pt-4">
      <img
        src="https://dictionary.cambridge.org/external/images/logo-lrg-small.png?version=5.0.329"
        alt='Cambridge Dictionary logo with "Cambridge Dictionary" on the left side'
        className="mr-4"
        role="image-logo"
      ></img>
      <p className="text-white">Make your words meaningful!</p>
    </div>
  );
};

export default Header;
