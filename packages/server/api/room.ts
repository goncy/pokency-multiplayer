import {Room} from "../types";

import pokemonApi from "./pokemon";

const rooms = new Map<string, Room>();

const api = {
  get: (name: string) => rooms.get(name) as Room,
  update: (name: string, values: Partial<Room>) => {
    const room = api.get(name);

    rooms.set(name, {
      ...room,
      ...values,
    });
  },
  setup: (name: string) => {
    rooms.set(name, {
      status: "playing",
      pokemon: pokemonApi.random(),
      winner: null,
      players: [],
    });
  },
  reset: (name: string) => {
    const room = api.get(name);

    rooms.set(name, {
      status: "playing",
      pokemon: pokemonApi.random(),
      winner: null,
      players: room?.players || [],
    });
  },
  connect: (name: string, id: string, player: string) => {
    const room = api.get(name);

    api.update(name, {
      players: room.players.concat({id, name: player}),
    });
  },
  disconnect: (name: string, id: string) => {
    const room = api.get(name);

    api.update(name, {
      players: room.players.filter((player) => player.id !== id),
    });
  },
  game: (name: string) => {
    const room = api.get(name);

    return {
      status: room.status,
      winner: room.winner,
      players: room.players,
      pokemon: room.pokemon.image,
    };
  },
};

export default api;
