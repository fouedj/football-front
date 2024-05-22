// PlayerList.tsx
import React from "react";
import useFetch from "../hooks/use-fetch";
import { Player } from "../utility/types";
import "../styles/PlayerList.css";

export default function PlayerList({ team }: any) {
  const { data: players, loading } = useFetch<Player[]>("player/team/" + team);

  return (
    <div className="player-list-container">
      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
      <ul className="player-list">
        {players?.map((player: Player) => (
          <li key={player.idPlayer} className="player-item">
            <div className="player-image-container">
              <img
                src={player.strCutout}
                alt={`${player.strPlayer} cutout`}
                className="player-image"
              />
            </div>
            <div className="player-name">{player.strPlayer}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
