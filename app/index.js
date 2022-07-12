import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./contexts/theme";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";

const Popular = React.lazy(() => import("./components/Popular"));
const Battle = React.lazy(() => import("./components/Battle"));
const Results = React.lazy(() => import("./components/Results"));

class App extends React.Component {
  state = {
    theme: "light",
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === "light" ? "dark" : "light",
      }));
    },
  };
  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className="container">
              <Nav />

              <React.Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<Popular />} />
                  <Route path="/battle" element={<Battle />} />
                  <Route path="/battle/results" element={<Results />} />
                  <Route path="*" element={<h1>404</h1>} />
                </Routes>
              </React.Suspense>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

const rootElement = document.getElementById("app");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
