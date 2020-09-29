import React from "react";
import io from "socket.io-client";

import ConnectScreen from "./screens/Connect";
import DisconnectedScreen from "./screens/Disconnected";
import LoadingScreen from "./screens/Loading";
import PlayingScreen from "./screens/Playing";
import FinishedScreen from "./screens/Finished";
import {Game} from "./types";

const socket = io(process.env.REACT_APP_SERVER_URL || "/", {autoConnect: false});

function App() {
  const [game, setGame] = React.useState<null | Game>(null);
  const [status, setStatus] = React.useState<Game["status"]>("init");

  function handleConnect(name: string, room: string) {
    socket.io.opts.query = {
      name,
      room,
    };

    socket.open();
  }

  function onGame(game: any) {
    setGame(game);
    setStatus(game.status);
  }

  function handleGuess(guess: string) {
    socket.emit("guess", guess);
  }

  React.useEffect(() => {
    socket.on("connect", () => setStatus("loading"));
    socket.on("disconnect", () => setStatus("disconnected"));

    socket.on("game", onGame);
  }, []);

  return (
    <main>
      {status === "init" && <ConnectScreen onConnect={handleConnect} />}
      {status === "disconnected" && <DisconnectedScreen />}
      {status === "loading" && <LoadingScreen />}
      {Boolean(game?.players?.length) && (
        <ul className="nes-list is-disc" id="players">
          {game?.players.map((player) => (
            <li key={player.id}>{player.name}</li>
          ))}
        </ul>
      )}
      {game && status === "playing" && (
        <PlayingScreen pokemon={game.pokemon} onGuess={handleGuess} />
      )}
      {game && status === "finished" && (
        <FinishedScreen pokemon={game.pokemon} winner={game.winner} />
      )}
    </main>
  );
}

export default App;
