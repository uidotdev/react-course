import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import Popular from "./components/Popular";
import Battle from "./components/Battle";
import Results from "./components/Results";
import { ThemeProvider } from "./contexts/theme";
import Nav from "./components/Nav";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: "light",
      toggleTheme: () => {
        this.setState(({ theme }) => ({
          theme: theme === "light" ? "dark" : "light",
        }));
      },
    };
  }

  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className="container">
              <Nav />
              <Switch>
                <Route path="/" exact component={Popular} />
                <Route path="/battle" exact component={Battle} />
                <Route path="/battle/results" component={Results} />
                <Route render={() => <h1>404</h1>} />
              </Switch>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
