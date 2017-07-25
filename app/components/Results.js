import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { battle } from '../utils/api';
import { Link } from 'react-router-dom';
import PlayerPreview from './PlayerPreview';
import Loading from './Loading';

function Profile ({ info }) {
  return (
    <PlayerPreview username={info.login} avatar={info.avatar_url}>
      <ul className='space-list-items'>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired,
}

function Player ({ label, score, profile }) {
  return (
    <div>
      <h1 className='header'>{label}</h1>
      <h3 style={{textAlign: 'center'}}>Score: {score}</h3>
      <Profile info={profile} />
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired,
}

class Results extends Component {
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true,
  }

  componentDidMount = () => {
    const players = queryString.parse(this.props.location.search);

    battle([
      players.playerOneName,
      players.playerTwoName
    ]).then((players) => {
      if (players === null) {
        return this.setState(() => {
          return {
            error: 'Looks like there was an error. Check that both users exist on Github.',
            loading: false,
          }
        });
      }

      this.setState(() => {
        return {
          error: null,
          winner: players[0],
          loser: players[1],
          loading: false,
        }
      });
    });
  }
  render() {
    const { error, winner, loser, loading } = this.state

    if (loading === true) {
      return <Loading />
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )
    }

    return (
      <div className='row'>
        <Player
          label='Winner'
          score={winner.score}
          profile={winner.profile}
        />
        <Player
          label='Loser'
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    )
  }
}

export default Results;