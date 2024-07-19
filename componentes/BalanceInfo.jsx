import React from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
const BalanceInfo = ({ userData, activateBonus }) => {
  console.log("aqui tus props")
  console.log(userData)
  const [open, setOpen] =useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', padding: '12px 16px' }}>
      <div style={{
        display: 'flex',
        minWidth: '111px',
        flex: 1,
        flexBasis: 'fit-content',
        flexDirection: 'column',
        gap: '8px',
        borderRadius: '8px',
        border: '1px solid #e5e7da',
        padding: '12px',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <p style={{
          color: '#181810',
          letterSpacing: 'light',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          lineHeight: 'tight'
        }}>{userData?userData.historicMinutesRented:<p>Cargando</p>}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <p style={{
            color: '#888d5e',
            fontSize: '0.875rem',
            fontWeight: 'normal',
            lineHeight: 'normal'
          }}>Minutos usados</p>
        </div>
      </div>
      <div style={{
        display: 'flex',
        minWidth: '111px',
        flex: 1,
        flexBasis: 'fit-content',
        flexDirection: 'column',
        gap: '8px',
        borderRadius: '8px',
        border: '1px solid #e5e7da',
        padding: '12px',
        alignItems: 'center',
        textAlign: 'center',
      }}
      onClick={userData?.bonusMinutes > 0 && userData?.punishment==!true? handleClickOpen : undefined}
      >
        <p style={{
          color: '#181810',
          letterSpacing: 'light',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          lineHeight: 'tight'
        }}>{userData?userData.bonusMinutes:<p>Cargando</p>}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <p style={{
            color: '#888d5e',
            fontSize: '0.875rem',
            fontWeight: 'normal',
            lineHeight: 'normal'
          }}>Extra</p>
        </div>
      </div>
      <div style={{
        display: 'flex',
        minWidth: '111px',
        flex: 1,
        flexBasis: 'fit-content',
        flexDirection: 'column',
        gap: '8px',
        borderRadius: '8px',
        border: '1px solid #e5e7da',
        padding: '12px',
        backgroundColor: userData?.punishment ? 'red' : '#fff',
        alignItems: 'center',
        textAlign: 'center'
      }}>
            <p style={{
      color: userData?.punishment ? 'white' : '#181810',
      letterSpacing: 'light',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      lineHeight: 'tight'
    }}>
      {userData ? (
        userData.punishment === true ? (
          "Sí"
        ) : (
          "N/A"
        )
      ) : (
        <p>Cargando</p>
      )}
    </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <p style={{
            color: userData?.punishment ? 'white' : '#888d5e',
            fontSize: '0.875rem',
            fontWeight: 'normal',
            lineHeight: 'normal'
          }}>Penal</p>
        </div>

        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Usar bonus?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Se te ha otorgado un bonus de 30 minutos por buen acta. Desea usarlo ahora?.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={()=>{
            activateBonus() 
            handleClose()}} autoFocus>
            Usar
          </Button>
        </DialogActions>
      </Dialog>

      </div>
    </div>
  );
}
  
  

export default BalanceInfo;
