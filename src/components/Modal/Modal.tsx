import { useState } from 'react';

import { Backdrop, Box, Modal, Fade, Button, Typography} from '@mui/material';

import styles from "./Modal.module.scss"

const TransitionModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>

      <Modal
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box className={styles.modal}>
            <Typography variant="h6" component="h2">
              Text
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default TransitionModal