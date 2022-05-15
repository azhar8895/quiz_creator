import React from 'react';
import { Avatar } from '@mui/material';
import classNames from 'classnames';
import c from '../shared.Module.scss';

const ProfilePicture = ({ imgSrc, imgAlt, onLoad, classToOverride }) => {
  return (
    <Avatar
      alt={imgAlt}
      src={imgSrc}
      className={classNames(
        'rounded-circle border border-5',
        c.imageDiv,
        classToOverride
      )}
      onLoad={onLoad}
    />
  );
};

export default ProfilePicture;
