import React, { useState } from "react";
import { Team } from "../utility/types";
import { Link } from "react-router-dom";
import "../styles/TeamList.css";
import useFetch from "../hooks/use-fetch";
import AutoComplete from "./AutoComplete";
import { useTranslation } from "react-i18next";

const TeamList: React.FC = () => {
  const [selectedLeague, setSelectedLeague] = React.useState("");
  const { t, i18n } = useTranslation();
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

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div className="team-list-container">
      <div className="language-switcher">
        <label htmlFor="language-select">{t("language")}</label>
        <select
          id="language-select"
          value={i18n.language}
          onChange={handleLanguageChange}
        >
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>
      </div>
      <h1>{t("teamList")}</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder={t("enterLeague")}
          value={searchLeague}
          onChange={handleSearchChange}
        />
        {searchLeague && showAutoComplete && (
          <AutoComplete text={searchLeague} onChange={onChangeAutoComplete} />
        )}
      </div>
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
