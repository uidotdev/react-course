import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import Popular from "./components/Popular";

class App extends React.Component {
  render() {
    return (
      <div className="light">
        <div className="container">
          <Popular />
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("app");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
