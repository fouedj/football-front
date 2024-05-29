import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTeamDetails } from "../services/api";
import { Team } from "../utility/types";
import useFetch from "../hooks/use-fetch";
import PlayerList from "./player-list";
import { useTranslation } from "react-i18next";
const TeamDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: team, loading } = useFetch<Team>("team/" + id);
  const { t } = useTranslation();
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{team?.name}</h1>
      <h2>{t("playerList")}</h2>
      <PlayerList team={team?.strTeam} />
    </div>
  );
};

export default TeamDetails;
