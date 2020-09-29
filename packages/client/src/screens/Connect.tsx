import React from "react";
import styled from "@emotion/styled";

const Submit = styled.button`
  width: 100%;
  margin-top: 24px;
`;

interface Props {
  onConnect: (name: string, room: string) => void;
}

const ConnectScreen: React.FC<Props> = ({onConnect}) => {
  const [error, setError] = React.useState<null | string>(null);
  const [name, setName] = React.useState<string>("");
  const [room, setRoom] = React.useState<string>("");

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name) {
      return setError("Name is required");
    }

    if (!room) {
      return setError("Room is required");
    }

    onConnect(name, room);
  }

  return (
    <form className="nes-container with-title" onSubmit={handleSubmit}>
      <div className="nes-field">
        <label>Your name</label>
        <input
          className="nes-input"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="nes-field" style={{marginTop: 24}}>
        <label>Room id</label>
        <input
          className="nes-input"
          type="text"
          value={room}
          onChange={(event) => setRoom(event.target.value)}
        />
      </div>
      {error && <span className="nes-text is-error">{error}</span>}
      <Submit className="nes-btn is-primary" type="submit">
        Connect
      </Submit>
    </form>
  );
};

export default ConnectScreen;
