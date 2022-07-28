import * as React from "react";
import { NavLink } from "react-router-dom";
import { ThemeConsumer } from "../contexts/theme";
import { sunIcon, moonIcon } from "./icons";

export default function Nav() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
        <nav className="split">
          <NavLink
            to="/"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " active" : "")
            }
          >
            Github Battle
          </NavLink>
          <ul className="row">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                Popular
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/battle"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                Battle
              </NavLink>
            </li>
            <li>
              <button className="btn secondary icon" onClick={toggleTheme}>
                {theme === "light" ? moonIcon : sunIcon}
              </button>
            </li>
          </ul>
        </nav>
      )}
    </ThemeConsumer>
  );
}
