import React, { useState } from "react";
import { fetchTeams } from "../services/api";
import { Team } from "../utility/types";
import { Link } from "react-router-dom";
import "../styles/TeamList.css";
import useFetch from "../hooks/use-fetch";
import AutoComplete from "./AutoComplete";

const TeamList: React.FC = () => {
  const [selectedLeague, setSelectedLeague] = React.useState("");
  console.log({ selectedLeague });
  const { data, loading } = useFetch<Team[]>(
    "team/in-league?league=" + selectedLeague,
    {
      league: selectedLeague,
    }
  );
  const [searchLeague, setSearchLeague] = useState<string>("");
  const [showAutoComplete, setShowAutoComplete] = React.useState(false);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchLeague(event.target.value);
    setShowAutoComplete(true);
  };

  const onChangeAutoComplete = (league: string) => {
    setSearchLeague(league);
    setSelectedLeague(league);
    setShowAutoComplete(false);
  };

  return (
    <div>
      <h1>Team List</h1>
      <input
        type="text"
        placeholder="Enter league to search"
        value={searchLeague}
        onChange={handleSearchChange}
      />
      {searchLeague && showAutoComplete && (
        <AutoComplete text={searchLeague} onChange={onChangeAutoComplete} />
      )}
      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
      <div className="team-list">
        {!loading &&
          data?.map((team) => (
            <Link
              to={`/teams/${team.idTeam}`}
              key={team.id}
              className="team-item"
            >
              <img
                src={team.strTeamBadge}
                alt={`${team.strTeam} badge`}
                className="team-badge"
              />
              {team.strTeam}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default TeamList;
