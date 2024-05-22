import React from "react";
import useFetch from "../hooks/use-fetch";
import "../styles/autocomplete.css";
export default function AutoComplete({
  text,
  onChange,
}: {
  text: string;
  onChange: (sel: string) => void;
}) {
  console.log(text);
  const { data } = useFetch<any[]>("league/all?name=" + text);

  return (
    <div className="autocomplete-container">
      <ul className="autocomplete-list ">
        {data?.map((league) => {
          return (
            <li onClick={() => onChange(league.strLeague)}>
              {league.strLeague}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
