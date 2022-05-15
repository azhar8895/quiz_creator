/*global chrome */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import c from '../shared.Module.scss';
import Skeleton from '@mui/material/Skeleton';
import AvatarWithInfo from '../../Layout/AvatarWithInfo';
import Headings from '../Headings';
import Text from '../Text';
import { Button } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
// import { AbilityWithPercentage } from "./AbilityWithPercentage";
import { Divider } from '@mui/material';
import { StopCircle } from '@mui/icons-material';
import { handleStartStop } from '../../../helpers/ExtensionHandler';
import { setIsTopicModel } from '../../../redux/Actions/ExtensionHandler';
import { SET_TOAST_ERROR } from '../../../redux/Actions/Common';
import { CHROME_EXTENSION_ID } from '../../../config/Constants';
import SessionDetails from '../SessionDetails';
import { setIsSessionDetailsOpen } from '../../../redux/Actions/ExtensionHandler';
import { Link } from 'react-router-dom';
const WelcomeSection = () => {
  const { profile_image_url, user_name, designation } =
    useSelector((state) => state?.generalInformation) || {};
  const IsExtensionActive = useSelector((state) => state.IsExtensionActive);
  const dispatch = useDispatch();
  const [Corporate, setCorporate] = useState([]);
  const { corporateClients, userCorporateDetails, sessionData } = useSelector(
    (state) => state
  );
  const isSessionDetailsOpen =
    useSelector((state) => state?.isSessionDetailsOpen) || false;
  const barData = useSelector((state) => state?.barData[0]) || [];
  const sessionInfo = useSelector((state) => state?.sessionData[0]) || [];

  useEffect(() => {
    setCorporate(
      userCorporateDetails?.map((items) => corporateClients[items.client_id])
    );
  }, [userCorporateDetails, corporateClients]);

  // const handleStartSession = (e) => {
  //   e.preventDefault();

  //   if (chrome && chrome.runtime) {
  //     dispatch(setIsTopicModel(true));
  //   } else {
  //     dispatch(
  //       SET_TOAST_ERROR({
  //         error: true,
  //         message: 'Extension Is not Installed or Something Went Wrong',
  //       })
  //     );
  //     window.open(
  //       `https://chrome.google.com/webstore/detail/ahura-ai-study-sessions/${CHROME_EXTENSION_ID}`
  //     );
  //   }
  // };

  const handleStopSession = (e) => {
    e.preventDefault();
    handleStartStop(false);
  };
  return (
    <>
      <div
        className={classNames(
          'w-100 rounded-3 d-flex align-items-center justify-content-between',
          c.welcomeSection
        )}
      >
        <div className="d-flex align-items-center">
          {!profile_image_url && !user_name ? (
            <>
              <Skeleton variant="circular" width={50} height={50} />
              <div className="ms-3">
                <Skeleton width={275} height={25} />
                <Skeleton width={150} height={15} />
              </div>
            </>
          ) : (
            <AvatarWithInfo
              alt="profile picture"
              src={profile_image_url}
              width="50px"
              height="50px"
              head={
                <Headings
                  headingType="h3"
                  text={`Welcome, ${user_name}`}
                  classToOverride="fw-bolder"
                />
              }
              subHead={
                <div className={classNames('d-flex')}>
                  <Text textType="t2">{designation}</Text>
                  <Text
                    textType="t2"
                    classToOverride={classNames('ms-1 fw-bold')}
                  >
                    | {Corporate && Corporate[0]?.client_name}
                  </Text>
                </div>
              }
              classForSubHead="fw-lighter"
            />
          )}
        </div>
        <div className="d-flex align-items-center">
          {sessionData[0]?.description && (
            <AvatarWithInfo
              src={`./`}
              width="62px"
              height="50px"
              alt={sessionData[0]?.description}
              head={
                <>
                  <Text textType="t3" classToOverride={classNames('fw-bold')}>
                    {sessionData[0]?.description}
                  </Text>
                </>
              }
              classForHead="fw-lighter me-5"
              subHead={<Text textType="t4">Last Session</Text>}
              classForSubHead={classNames(c.lastSessionTopic, 'fw-bold')}
              variant="rounded"
            />
          )}
          {IsExtensionActive ? (
            <Button
              variant="contained"
              endIcon={<StopCircle />}
              onClick={(e) => {
                handleStopSession(e);
              }}
              className={classNames('rounded fw-bold ms-2', c.StopSessionBtn)}
            >
              Stop Session
            </Button>
          ) : (
            <Button
              variant="contained"
              endIcon={<PlayCircleOutlineIcon />}
              component={Link} to="/content"
              // onClick={(e) => {
              //   handleStartSession(e);
              // }}
              className={classNames('rounded fw-bold ms-2', c.resumeSessionBtn)}
            >
              Start Session
            </Button>
          )}
          {IsExtensionActive && (
            <div className={classNames(c.liveChip, 'ms-5')}>
              <Text textType="t4">Live</Text>
            </div>
          )}
        </div>
      </div>
      <Divider className="my-3" />
      {isSessionDetailsOpen && (
        <SessionDetails
          sessionInfo={sessionInfo}
          barInfo={barData}
          setModal={() => dispatch(setIsSessionDetailsOpen(false))}
        />
      )}
    </>
  );
};

export default WelcomeSection;
