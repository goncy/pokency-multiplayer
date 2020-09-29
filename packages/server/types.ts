export interface Player {
  id: string;
  name: string;
}

export interface Pokemon {
  image: string;
  name: string;
}

export interface Room {
  status: "playing" | "finished";
  winner: string | null;
  players: Player[];
  pokemon: Pokemon;
}

export interface Game extends Omit<Room, "pokemon"> {
  pokemon: string;
}
