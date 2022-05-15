import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Headings from '../../Headings';
import classNames from 'classnames';
import c from '../../shared.Module.scss';
import Text from '../../Text';
import Button from '@mui/material/Button';

const SessionMetrics = ({ stats, barData, setModal }) => {
  const [distractionsInfo, setDistractionsInfo] = useState([]);
  const { duration, visited_pages } = stats;

  useEffect(() => {
    if (visited_pages?.length) {
      const browsedPages = visited_pages?.filter(
        (item, index) => index < 2 && item?.duration !== null
      );
      setDistractionsInfo(browsedPages);
    }
  }, [visited_pages]);

  return (
    <div className="col-xl-6 position-relative ps-4 pe-3 bg-white rounded-end">
      <Box className="mt-2 text-end">
        <IconButton onClick={() => setModal(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Headings headingType="h2" classToOverride="fw-bold">
        Session Metrics
      </Headings>
      <Headings headingType="h4" classToOverride="fw-bold">
        {duration}
      </Headings>
      <Text
        textType="t2"
        classToOverride={classNames(c.sessionTime, c.fontWeight500)}
      >
        Session Time
      </Text>
      <div
        className={classNames(
          'd-flex justify-content-center align-items-center',
          c.sessionBar
        )}
      >
        {Object.keys(barData)?.map((item) => (
            item !== "session_id" && (
          <div
            key={item}
            className="h-75 w-25 d-flex flex-column justify-content-end align-items-center"
          >
            <div
              className={classNames(
                'w-75 d-flex justify-content-center align-items-center',
                c[`${item}BehaviorBar`]
              )}
              style={{ height: `${barData[item]}%` }}
            >
              <Headings
                headingType="h5"
                classToOverride={classNames(
                  'fw-bold',
                  barData[item] > 9 && 'text-white'
                )}
              >
                {barData[item]}%
              </Headings>
            </div>
            <Text
              textType="t1"
              classToOverride={classNames(
                'mt-2 text-capitalize',
                c.fontWeight500,
                c.fade
              )}
            >
              {(item === 'good' && 'relevant') ||
                (item === 'bad' && 'distractions') ||
                item}
            </Text>
          </div>)
        ))}
      </div>
      
      {distractionsInfo?.length > 0 && (
        <>
          <Headings headingType="h5" classToOverride="pb-2 fw-bold">
            Your biggest distractions came from:
          </Headings>
          {distractionsInfo?.map((item) => (
            <div key={item?.tab_id} className="d-flex justify-content-between">
              <a
                href={item?.url?.replaceAll(`'`, ``)}
                className={classNames(
                  'pt-1 text-decoration-none',
                  c.visitedPage,
                  c.font_18,
                  c.fontWeight600
                )}
              >
                {new URL(item?.url?.replaceAll(`'`, ``))?.hostname?.replace(
                  `www.`,
                  ``
                )}
              </a>
              <Headings headingType="h6" classToOverride="pe-4 fw-bold">
                {item?.duration}
              </Headings>
            </div>
          ))}
        </>
      )}
      <div className="w-100 text-center position-absolute bottom-0 end-0 translate-middle-y">
        <Button
          variant="outlined"
          size="large"
          className="w-50 text-capitalize"
          onClick={() => setModal(false)}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SessionMetrics;
