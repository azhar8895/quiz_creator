import React from 'react';
import { Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { SET_TOAST_ERROR } from '../../../redux/Actions/Common';
import { useDispatch } from 'react-redux';
const CustomSnackBar = () => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state?.toast_error?.error) || false;
  const message =
    useSelector((state) => state?.toast_error?.message) || undefined;
  const handleExited = () => {
    // setMessageInfo(undefined);
  };
  const handleClose = () => {
    dispatch(SET_TOAST_ERROR({ error: false, message: undefined }));
  };

  return (
    <Snackbar
      //   key={messageInfo ? messageInfo.key : undefined}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      TransitionProps={{ onExited: handleExited }}
      message={message}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          sx={{ p: 0.5 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      }
    />
  );
};

export default CustomSnackBar;
