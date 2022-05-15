/**
 * @function AbilityWithPercentage
 * @param {string} ability
 * @param {number} percentage without %
 */

import React from "react";
import classNames from "classnames";
import c from "../../shared.Module.scss";
import Text from "../../Text";
export const AbilityWithPercentage = ({
  ability = "Ability",
  percentage = 0,
  classToOverride,
}) => {
  return (
    <div
      className={classNames(
        "d-flex flex-column align-items-center",
        classToOverride
      )}
    >
      <div className={classNames(c.ability)}>{ability}</div>
      <div className={classNames(c.percentage, "fw-bold")}>
        <Text textType="t0">{percentage}%</Text>
      </div>
    </div>
  );
};
