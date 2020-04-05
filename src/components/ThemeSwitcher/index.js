import React from "react";

const ThemeSwitcher = ({ toggleTheme }) => (
  <button onClick={toggleTheme} className="theme">
    Alterar Tema dos Cards
  </button>
);

export default ThemeSwitcher;
