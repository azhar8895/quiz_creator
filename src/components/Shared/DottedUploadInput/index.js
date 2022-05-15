/**
 * @function DottedUploadInput
 * returns a file when uploaded
 * it will take 100% height and width provided
 * @param accept type of file you want default is image/*
 * @param onFileUpload function where you will capture the uploaded file
 * @param text the upload text
 */

import React from 'react';
import { IconButton, Input } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import classNames from 'classnames';
import c from '../shared.Module.scss';
import Headings from '../Headings';
const DottedUploadInput = ({
  accept = 'image/*',
  onFileUpload,
  text,
  type,
  onClick,
}) => {
  return (
    <div
      className={classNames(
        'd-flex align-items-center justify-content-center w-100 h-100',
        c.dottedInput
      )}
    >
      <label htmlFor="icon-button-file" className="text-center">
        <Input
          accept={accept}
          id="icon-button-file"
          type={type || null}
          sx={{ display: 'none' }}
          onChange={onFileUpload}
          inputProps={{ accept: accept }}
        />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={onClick}
        >
          <AddIcon />
        </IconButton>
        <Headings
          headingType="h6"
          classToOverride={classNames(c.dottedInputUpload)}
        >
          {text || 'Upload'}
        </Headings>
      </label>
    </div>
  );
};

export default DottedUploadInput;
