/**
 * @function Headings
 * @param {string} headingType
 * @param {string} text if children props are not sent
 * @param {string} className
 * @returns Heading with particular font-size
 */

import React from 'react';
import classNames from 'classnames';
import c from '../shared.Module.scss';
const Headings = ({ headingType, text, classToOverride, ...props }) => {
  const headings = {
    h0: 'heading0',
    h1: 'heading1',
    h2: 'heading2',
    h3: 'heading3',
    h4: 'heading4',
    h5: 'heading5',
    h6: 'heading6',
    h30: 'heading30',
    h32: 'heading32',
    h36: 'heading36',
  };
  return (
    <div className={classNames(c[headings[headingType]], classToOverride)}>
      {props.children || props.children === 0 ? props.children : text}
    </div>
  );
};

export default Headings;
