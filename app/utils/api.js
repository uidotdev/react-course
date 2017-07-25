import axios from 'axios';

const id = "YOUR_CLIENT_ID";
const sec = "YOUR_SECRET_ID";
const params = `?client_id=${id}&client_secret=${sec}`;

async function getProfile (username) {
  try {
    const user = await axios.get(`https://api.github.com/users/${username}${params}`);
    return user.data;
  } catch (error) {
    handleError(error);
  }

}

function getRepos (username) {
  return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`);
}

function getStarCount (repos) {
  return repos.data.reduce((count, repo) => {
    return count + repo.stargazers_count
  }, 0);
}

function calculateScore (profile, repos) {
  const followers = profile.followers;
  const totalStars = getStarCount(repos);

  return (followers * 3) + totalStars;
}

function handleError (error) {
  console.warn(error);
  return null;
}

async function getUserData (player) {
  try {
    const data = await axios.all([
      getProfile(player),
      getRepos(player)
    ])
    const profile = data[0];
    const repos = data[1];

    return {
      profile,
      score: calculateScore(profile, repos)
    }
  } catch (error) {
    handleError(error);
  }
}

function sortPlayers (players) {
  return players.sort((a,b) => {
    return b.score - a.score;
  });
}

export async function battle (players) {
  const promises = players.map(getUserData)
  try {
    const players = await axios.all(promises)
    return sortPlayers(players)
  } catch (error) {
    handleError(error);
  }
}

export async function fetchPopularRepos (language) {
  const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
  try {
    const response = await axios.get(encodedURI)
    return response.data.items;
  } catch (error) {
    handleError(error);
  }
}