import React from 'react';
import { useSelector } from 'react-redux';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import classNames from 'classnames';
import c from '../shared.Module.scss';
import Headings from '../Headings';
import ProfilePicture from '../ProfilePicture';
import SessionMetrics from './SessionMetrics';

const SessionDetails = ({ sessionInfo, barInfo, setModal }) => {
  const userGeneralInfo =
    useSelector((state) => state?.generalInformation) || {};
  const { profile_image_url, user_name } = userGeneralInfo;

  return (
    <Modal
      open={true}
      className="d-flex align-items-center"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        className={classNames('row g-0 flex-wrap mx-auto', c.sessionDetails)}
      >
        <div
          className={classNames(
            'col-xl-6 text-white rounded-start',
            c.firstBox
          )}
        >
          <Headings headingType="h2" classToOverride="pt-5 fw-bold">
            Session Details
          </Headings>
          <div className="pt-5 d-flex align-items-center">
            <ProfilePicture
              imgSrc={profile_image_url}
              alt={user_name}
              classToOverride={c.profileImage}
            />
            <div className="ps-3">
              <Headings headingType="h3" classToOverride="fw-bold">
                {user_name}
              </Headings>
              <Headings headingType="h6">
                <span className={c.fontWeight600}>Studying: </span>
                <span className="fw-normal">{sessionInfo?.description}</span>
              </Headings>
            </div>
          </div>
        </div>
        <SessionMetrics
          stats={sessionInfo}
          barData={barInfo}
          setModal={setModal}
        />
      </Box>
    </Modal>
  );
};

export default SessionDetails;
