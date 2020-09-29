import React from "react";

import {Game} from "../types";

interface Props {
  pokemon: Game["pokemon"];
  onGuess: (guess: string) => void;
}

const PlayingScreen: React.FC<Props> = ({pokemon, onGuess}) => {
  const [guess, setGuess] = React.useState<string>("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    guess && onGuess(guess);
  }

  return (
    <>
      <h1>Who's this Pokemon?</h1>
      <img
        alt="Pokemon"
        height={512}
        src={pokemon}
        style={{
          imageRendering: "pixelated",
          filter: `brightness(0)`,
          pointerEvents: "none",
          userSelect: "none",
        }}
        width={512}
      />
      <form style={{display: "inline-flex"}} onSubmit={handleSubmit}>
        <input
          autoFocus
          className="nes-input"
          data-test-id="input"
          onChange={(event) => setGuess(event.target.value)}
        />
        <button className="nes-btn is-primary" type="submit">
          Adivinar
        </button>
      </form>
    </>
  );
};

export default PlayingScreen;
