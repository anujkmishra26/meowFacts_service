import React from "react";
import { defaultCatImage } from "../utils/variables";

const FactCard = ({ fact }) => {
  return (
    <div className="fact__card">
      <img src={defaultCatImage} alt="cat" />
      <p>{fact}</p>
    </div>
  );
};

export { FactCard };
