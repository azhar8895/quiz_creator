/**
 * @function Text
 * @param {string} headingType
 * @param {string} text if children props are not sent
 * @param {string} className
 * @returns text with particular font-size
 */

import React from 'react';
import c from '../shared.Module.scss';
import classNames from 'classnames';
const Text = ({ textType, text, classToOverride, ...props }) => {
  const texts = {
    t0: "text0",
    t1: "text1",
    t2: "text2",
    t3: "text3",
    t4: "text4",
    t5: "text5",
    t18: "text18",
    t22: "text22",
    t24: "text24",
  };
  return (
    <div className={classNames(c[texts[textType]], classToOverride)}>
      {props.children || props.children === 0 ? props.children : text}
    </div>
  );
};

export default Text;
