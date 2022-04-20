import { useState } from 'react';

import { Box, Button, Typography, Modal} from '@mui/material';

import styles from "./Modal.module.scss"

const TransitionModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [unmountStyle, setUnmountStyle] = useState(false)

  const handleOpen = () => {
    setOpenModal(true)

    setUnmountStyle(false)
  };
  const handleClose = () => {
    setUnmountStyle(true)

    setTimeout(() => setOpenModal(false), 500);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{marginTop: "10px"}}
      >
        Open modal
      </Button>

      <Modal
        open={openModal}
        onClose={handleClose}
        className={
          unmountStyle
            ? styles.hiddenBackdrop
            : styles.backdrop
          }
      >
        
        <Box className={styles.modal}>
          <Typography variant="h6" component="h2">
            Text
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default TransitionModal