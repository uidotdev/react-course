import * as React from "react";

export default class Popular extends React.Component {
  render() {
    const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];

    return (
      <select>
        {languages.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
    );
  }
}
