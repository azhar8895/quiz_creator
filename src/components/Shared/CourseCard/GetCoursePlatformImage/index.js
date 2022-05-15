import React from 'react';
import Text from '../../Text';
import { Resources } from '../../../../config/Resources';
import classNames from 'classnames';
const GetCoursePlaformImage = ({ platform, courseCategory }) => {
  if (platform === 'udemy') {
    return <img src={Resources.icons.udemy} alt="udemy img" height="35px" />;
  } else if (platform === 'google') {
    return (
      <img src={Resources.icons.googleBlack} alt="google img" height="22px" />
    );
  }
  return (
    <Text textType="t1" classToOverride={classNames('fw-bold')}>
      {courseCategory?.toUpperCase() || ''}
    </Text>
  );
};

export default GetCoursePlaformImage;
