import { useState } from 'react';

export function useModalHandlers() {
  const [open, setOpen] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClickOpenAdmin = () => setOpenAdmin(true);
  const handleClickCloseAdmin = () => setOpenAdmin(false);

  return { open, openAdmin, handleClickOpen, handleClose, handleClickOpenAdmin, handleClickCloseAdmin };
}
