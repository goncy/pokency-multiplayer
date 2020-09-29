import React from "react";

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
      {error && (
        <div className="nes-text is-error" style={{marginTop: 12, marginBottom: 0}}>
          {error}
        </div>
      )}
      <button className="nes-btn is-primary" style={{width: "100%", marginTop: 24}} type="submit">
        Connect
      </button>
    </form>
  );
};

export default ConnectScreen;
