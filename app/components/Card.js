import * as React from "react";
import PropTypes from "prop-types";
import { ThemeConsumer } from "../contexts/theme";

export default function Card({ profile }) {
  const {
    login,
    avatar_url,
    html_url,
    followers,
    following,
    public_repos,
    location,
    company,
  } = profile;
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className={`card bg-${theme}`}>
          <header className="split">
            <div>
              <h4>
                <a href={html_url}>
                  {login}
                </a>
              </h4>
              <p>{location || "unknown"}</p>
            </div>
            <img
              className="avatar large"
              src={avatar_url}
              alt={`Avatar for ${login}`}
            />
          </header>
          <ul className="stack">
            <li className="split">
              <span>Name:</span> <span>{login || "n/a"}</span>
            </li>
            <li className="split">
              <span>Company:</span> <span>{company || "n/a"}</span>
            </li>
            <li className="split">
              <span>Followers:</span> <span>{followers}</span>
            </li>
            <li className="split">
              <span>Following:</span> <span>{following}</span>
            </li>
            <li className="split">
              <span>repositories:</span> <span>{public_repos}</span>
            </li>
          </ul>
        </div>
      )}
    </ThemeConsumer>
  );
}

Card.propTypes = {
  profile: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    html_url: PropTypes.string.isRequired,
    followers: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired,
    repositories: PropTypes.number,
    location: PropTypes.string,
    company: PropTypes.string,
  }).isRequired,
};
