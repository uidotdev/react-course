import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import Loading from './Loading';

function SelectLanguage ({ selectedLanguage, onSelect }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <ul className='languages'>
      {languages.map((lang) => {
        return (
          <li
            style={lang === selectedLanguage ? {color: '#d0021b'} : null}
            onClick={onSelect.bind(null, lang)}
            key={lang}>
              {lang}
          </li>
        )
      })}
    </ul>
  )
}

function RepoGrid ({ repos }) {
  return (
    <ul className='popular-list'>
      {repos.map((repo, index) => {
        return (
          <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={`Avatar for ${repo.owner.login}`}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

class Popular extends Component {
  state = {
    selectedLanguage: 'All',
    repos: null,
  }

  componentDidMount = () => {
    this.updateLanguage(this.state.selectedLanguage)
  }
  updateLanguage = async (lang) => {
    this.setState(() => {
      return {
        selectedLanguage: lang,
        repos: null
      }
    });

    try {
      const repos = await fetchPopularRepos(lang)
      this.setState(() => ({ repos }))
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage} />
        {!this.state.repos
          ? <Loading />
          : <RepoGrid repos={this.state.repos} />}
      </div>
    )
  }
}

export default Popular;