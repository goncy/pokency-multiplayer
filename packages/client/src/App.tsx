import React from "react";
import io from "socket.io-client";
import styled from "@emotion/styled";

import ConnectScreen from "./screens/Connect";
import DisconnectedScreen from "./screens/Disconnected";
import LoadingScreen from "./screens/Loading";
import PlayingScreen from "./screens/Playing";
import FinishedScreen from "./screens/Finished";
import {Game} from "./types";
import Players from "./components/Players";

const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  flex-direction: column;
  position: relative;
  padding: 24px;
`;

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
    <Container>
      {game && Boolean(game.players?.length) && <Players players={game.players} />}
      {status === "init" && <ConnectScreen onConnect={handleConnect} />}
      {status === "disconnected" && <DisconnectedScreen />}
      {!game || (status === "loading" && <LoadingScreen />)}
      {game && status === "playing" && (
        <PlayingScreen pokemon={game.pokemon} onGuess={handleGuess} />
      )}
      {game && status === "finished" && (
        <FinishedScreen pokemon={game.pokemon} winner={game.winner} />
      )}
    </Container>
  );
}

export default App;
