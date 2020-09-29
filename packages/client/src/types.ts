export interface Game {
  status: "init" | "loading" | "playing" | "disconnected" | "finished";
  pokemon: string;
  winner?: string;
  players: {
    id: string;
    name: string;
  }[];
}
