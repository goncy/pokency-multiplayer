import React from "react";
import styled from "@emotion/styled";

import {Game} from "../types";

interface Props {
  players: Game["players"];
}

const Container = styled.ul`
  position: absolute;
  top: 24px;
  left: 24px;
`;

const Players: React.FC<Props> = ({players}) => {
  return (
    <Container className="nes-list is-disc">
      {players.map((player) => (
        <li key={player.id}>{player.name}</li>
      ))}
    </Container>
  );
};

export default Players;
