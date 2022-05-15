import React from 'react';
import { Modal, Box } from '@mui/material';
import classNames from 'classnames';
import c from '../shared.Module.scss';

const ModalBox = ({ openModal, classToOverride, ...props }) => {
  return (
    <Modal
      open={openModal}
      className="d-flex align-items-center"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        className={classNames(
          'container-fluid g-0 rounded bg-white',
          c.modalBox,
          classToOverride
        )}
      >
        <Box className={classNames('row g-0 rounded-top', c.modalTopBorder)} />
        {props?.children}
      </Box>
    </Modal>
  );
};

export default ModalBox;
