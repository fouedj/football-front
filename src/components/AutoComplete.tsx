import React from "react";
import useFetch from "../hooks/use-fetch";
import "../styles/autocomplete.css";

interface AutoCompleteProps {
  text: string;
  onChange: (sel: string) => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ text, onChange }) => {
  const { data } = useFetch<any[]>("league/all?name=" + text);

  if (!text || !data || data.length === 0) {
    return null;
  }

  return (
    <div className="autocomplete-container">
      <ul className="autocomplete-list">
        {data.map((league) => (
          <li key={league.id} onClick={() => onChange(league.strLeague)}>
            <span>{league.strLeague}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutoComplete;
