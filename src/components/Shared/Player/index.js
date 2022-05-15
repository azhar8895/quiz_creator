import React from 'react';
import ReactPlayer from 'react-player';
import classNames from 'classnames';
import c from '../shared.Module.scss';

const Player = ({url, width, height, imageUrl, ...props}) => {
    return(
        <div className={classNames(c.playerWrapper)}>
            <ReactPlayer
                className={classNames(c.reactPlayer)}
                url={url}
                controls={true}
                width={width || '100%'}
                height={height || '100%'}
                light={imageUrl || ""}
            />
        </div>
    )
}

const PlayerAuto = ({url, width, height, playing, ...props}) => {
    console.log(props?.loop)
    return(
        <div className={classNames(c.playerWrapper)}>
            <ReactPlayer
                className={classNames(c.reactPlayer)}
                url={url}
                controls={true}
                width={width || '100%'}
                height={height || '100%'}
                playing={playing || false}
                loop={props?.loop}
                onEnded={()=> props?.onEnded()}
            />
        </div>
    )
}

export {Player, PlayerAuto};