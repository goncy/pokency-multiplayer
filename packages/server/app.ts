import * as io from "socket.io";

import pokemonApi from "./api/pokemon";
import roomApi from "./api/room";

const server = io.listen(3000);

server.on("connection", (socket) => {
  const {room, name} = socket.handshake.query;

  if (!roomApi.get(room)) {
    roomApi.setup(room);
  }

  socket.join(room, () => {
    roomApi.connect(room, socket.id, name);

    server.in(room).emit("game", roomApi.game(room));
  });

  socket.on("guess", (guess) => {
    const state = roomApi.get(room);

    if (!state || state.status !== "playing") {
      return;
    }

    if (pokemonApi.matches(guess, state.pokemon.name)) {
      roomApi.update(room, {
        status: "finished",
        winner: name,
      });

      server.in(room).emit("game", roomApi.game(room));

      setTimeout(() => {
        roomApi.reset(room);

        server.in(room).emit("game", roomApi.game(room));
      }, 3000);
    }
  });

  socket.on("disconnect", () => {
    roomApi.disconnect(room, socket.id);

    server.in(room).emit("game", roomApi.game(room));
  });
});

export default server;
