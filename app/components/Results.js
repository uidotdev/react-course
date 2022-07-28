import * as React from "react";
import { battle } from "../utils/api";
import Card from "./Card";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import withSearchParams from "./withSearchParams";

class Results extends React.Component {
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true,
  };
  componentDidMount() {
    const sp = this.props.router.searchParams;
    const playerOne = sp.get("playerOne");
    const playerTwo = sp.get("playerTwo");

    battle([playerOne, playerTwo])
      .then((players) => {
        this.setState({
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false,
        });
      })
      .catch(({ message }) => {
        this.setState({
          error: message,
          loading: false,
        });
      });
  }
  render() {
    const { winner, loser, error, loading } = this.state;

    if (loading === true) {
      return <Loading text="Battling" />;
    }

    if (error) {
      return <p className="text-center error">{error}</p>;
    }

    return (
      <main className="animate-in stack main-stack">
        <div className="split">
          <h1>Results</h1>
          <Link to="/battle" className="btn secondary">
            Reset
          </Link>
        </div>
        <section className="grid">
          <article className="results-container">
            <Card profile={winner.profile} />
            <p className="results">
              <span>
                {winner.score === loser.score ? "Tie" : "Winner"}{" "}
                {winner.score.toLocaleString()}
              </span>
              {winner.score !== loser.score && (
                <img
                  width={80}
                  src="https://ui.dev/images/certificate.svg"
                  alt="Certificate"
                />
              )}
            </p>
          </article>
          <article className="results-container">
            <Card profile={loser.profile} />
            <p className="results">
              <span>
                {winner.score === loser.score ? "Tie" : "Loser"} {""}
                {loser.score.toLocaleString()}
              </span>
            </p>
          </article>
        </section>
      </main>
    );
  }
}

export default withSearchParams(Results);
