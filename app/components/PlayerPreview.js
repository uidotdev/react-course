import React from 'react';
import PropTypes from 'prop-types';

function PlayerPreview ({ avatar, username, children }) {
  return (
    <div>
      <div className='column'>
        <img
          className='avatar'
          src={avatar}
          alt={'Avatar for ' + username}
        />
        <h2 className='username'>@{username}</h2>
      </div>
      {children}
    </div>
  )
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default PlayerPreview;