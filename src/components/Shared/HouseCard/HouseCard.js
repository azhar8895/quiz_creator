import React from "react";
import classNames from "classnames";
import c from "../shared.Module.scss";
const HouseCard = (props) => {
  
  return (
    <div>
   <div style={{width: `${props.BarWidth}` ,
backgroundColor: `${props.FirstColor}` , height: `${props.BarHeight}`}} className={classNames("", c.HouseCardDesign)}>  </div>
<div style={{width: `${props.BodyWidth}` ,
backgroundColor: `${props.SecondColor}` , height: `${props.BodyHeight}`}} className={classNames("position-relative", c.HouseCardBody)}>
    {props.children}
</div>
 </div>
)
}


export default HouseCard;