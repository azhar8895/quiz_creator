/**
 * @function CourseCard
 * Renders information related courses as a card
 */

import React from 'react';
import classNames from 'classnames';
import c from './couseCard.Module.scss';
import Text from '../Text';
import Headings from '../Headings';
import Tooltip from '@mui/material/Tooltip';
import _ from 'lodash';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Chip } from '@mui/material';
import { IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { GroupOutlined } from '@mui/icons-material';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import WebOutlinedIcon from '@mui/icons-material/WebOutlined';

const CourseCard = ({
  type = 'courses',
  id,
  courseCategory,
  heading,
  desc,
  peers = 0,
  sections = 0,
  quizzes = 0,
}) => {
  return (
    <div className={classNames(c[`${type}Card`], c.courseCard, 'ps-4 pe-3')}>
      <div className="pt-2 fw-bold d-flex justify-content-between align-items-center">
        {/* <Text textType="t1">{type}</Text> */}

        <Chip
          label={courseCategory}
          className={classNames(c[`${type}Chip`])}
          size="small"
        />

        {/* <IconButton color="inherit">
          <ShareOutlinedIcon sx={{ fontSize: 20 }} />
        </IconButton> Share */}
        <div className="align-items-center">
          <Button startIcon={<ShareOutlinedIcon />} sx={{ color: 'inherit' }}>
            Share
          </Button>
          <IconButton color="inherit">
            <MoreVertOutlinedIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </div>
        {/* <Text textType="t1">{courseCategory}</Text> card */}
      </div>
      <div className={c.courseCardContent}>
        <Headings headingType="h5" classToOverride="pt-2 fw-bold">
          {heading}
        </Headings>
        {type !== 'courses' && (
          <Tooltip title={desc} arrow>
            <span
              className={classNames(c.courseCardDesc, c.font_16, 'fw-normal')}
            >
              {_.truncate(desc, { length: 80 })}
            </span>
          </Tooltip>
        )}

        {/* -----------------Peers, Sections, Quizes --------------- */}

        {type === 'courses' && (
          <div className="d-flex mt-2">
            {/* <div className="col-4"> */}
            <div
              className={classNames(
                c.peerSection,
                'text-center rounded-3 ms-2'
              )}
            >
              <div className="d-flex align-items-center justify-content-center">
                <GroupOutlined />
                <Text textType={'t2'} classToOverride="ms-1">
                  {' '}
                  {peers} Peers
                </Text>
              </div>
            </div>
            {/* </div> */}

            {/* <div className="col-4"> */}
            <div
              className={classNames(
                c.peerSection,
                'text-center rounded-3 ms-2'
              )}
            >
              <div className="d-flex align-items-center justify-content-center">
                <MenuBookOutlinedIcon />
                <Text textType={'t2'} classToOverride="ms-1">
                  {' '}
                  {sections} Sections
                </Text>
              </div>
            </div>
            {/* </div> */}
            {/* <div className="col-4"> */}
            <div
              className={classNames(
                c.peerSection,
                'text-center rounded-3 ms-2'
              )}
            >
              <div className="d-flex align-items-center justify-content-center">
                <WebOutlinedIcon />
                <Text textType={'t2'} classToOverride="ms-1">
                  {' '}
                  {quizzes} Quizzes
                </Text>
              </div>
            </div>
            {/* </div> */}
          </div>
        )}
      </div>

      <div className="w-100 d-flex justify-content-between align-items-center">
        <div className="text-center">
          {/* {type === 'video' ? (
            <YouTubeIcon sx={{ fontSize: 50 }} />
          ) : (
            <img
              src={
                type === 'audio'
                  ? Resources?.icons?.headphones
                  : Resources?.icons[type]
              }
              alt={`${type ? type : 'course'} icon`}
              height="50px"
              width="50px"
            />
          )} */}

          {/* <Text textType="t3" classToOverride="fw-bold">
            {type.toUpperCase()}
          </Text> */}
        </div>
        <div>
          <Link to={`/course/${id}`} className={classNames(c.linkStyle)}>
            <Tooltip title="View" arrow>
              <IconButton color="inherit">
                {/* <PlayCircleIcon sx={{ fontSize: 55 }} /> */}
                <ContentCopyOutlinedIcon
                  className={classNames(c.iconButton, 'rounded-circle')}
                />
              </IconButton>
            </Tooltip>
          </Link>

          <IconButton color="inherit" disabled={true}>
            <CalendarTodayOutlinedIcon
              className={classNames(c.iconButton, 'rounded-circle')}
            />
          </IconButton>

          <IconButton color="inherit" disabled={true}>
            <AddIcon className={classNames(c.iconButton, 'rounded-circle')} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
