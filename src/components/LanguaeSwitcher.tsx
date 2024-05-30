import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/LanguageSwitcher.css";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div className="language-switcher-container">
      <label htmlFor="language-select" className="language-label">
        Language:
      </label>
      <select
        id="language-select"
        value={i18n.language}
        onChange={handleLanguageChange}
        className="language-select"
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
