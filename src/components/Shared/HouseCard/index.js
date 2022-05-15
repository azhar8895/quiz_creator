/**
 * @function HouseCard
 * @param cardHeadClass class of the cap of component
 * @param cardBodyClass class of the children props of component
 * @param className class of the whole component
 * this renders a type of house card
 */

import React from 'react';
import classNames from 'classnames';
import c from '../shared.Module.scss';

const NewHouseCard = ({
  cardHeadClass,
  cardBodyClass,
  className,
  ...props
}) => {
  return (
    <div className={className}>
      <div className={classNames(c.HouseCardDesign, cardHeadClass)}></div>
      <div className={classNames(c.HouseCardBodynew, cardBodyClass)}>
        {props.children}
      </div>
    </div>
  );
};

export default NewHouseCard;
