/**
 * @function ProfileCard
 * @param {text} isOpen text from another components
 * @returns It will contains cards. It display the user profile
 *
 */

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Resources } from '../../../config/Resources';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SharedStyling from '../shared.Module.scss';
import classNames from 'classnames';
import { Avatar } from '@mui/material';

const ProfileCard = (props) => {
  return (
    <div className="col-3 mb-2">
      <Card className={classNames(SharedStyling.card2, 'w-100 mt-2')}>
        <CardContent>
          <div>
            <MoreHorizIcon
              className={classNames(SharedStyling.moreHorizonIcon)}
            />
          </div>
          <div className="text-center mb-3">
            <Avatar
              src={props.image}
              alt="logo"
              className={classNames(SharedStyling.imageStyle, 'mx-auto')}
            />
          </div>
          <div className={classNames(SharedStyling.secoundImg)}>
            <img src={Resources.images.AhuraMyAccount} alt="logo" />
          </div>

          <h5 className="text-center">
            <b>{props.name}</b>
          </h5>
          <p className={classNames(SharedStyling.personalProfile)}>
            {props.info}
          </p>
          <div className="mt-2">
            <p className={classNames(SharedStyling.para)}>{props.email}</p>
            <p className={classNames(SharedStyling.para)}>{props.para} </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCard;
