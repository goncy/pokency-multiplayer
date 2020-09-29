import React from "react";

import {Game} from "../types";

interface Props {
  pokemon: Game["pokemon"];
  winner: Game["winner"];
}

const FinishedScreen: React.FC<Props> = ({pokemon, winner}) => {
  return (
    <>
      <h1>Game finished</h1>
      <img
        alt="Pokemon"
        height={512}
        src={pokemon}
        style={{
          imageRendering: "pixelated",
        }}
        width={512}
      />
      <h4>Winner: {winner}</h4>
    </>
  );
};

export default FinishedScreen;
