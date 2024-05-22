import axios from "axios";
import { Team } from "../utility/types";

const API_BASE_URL = "http://localhost:3000/api";

export const fetchTeams = async (league: string): Promise<Team[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/team/in-league`, {
      params: { league },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error; // Re-throw the error after logging it
  }
};

export const fetchTeamDetails = async (teamId: number): Promise<Team> => {
  const response = await fetch(`${API_BASE_URL}/teams/${teamId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch team details");
  }
  return response.json();
};
