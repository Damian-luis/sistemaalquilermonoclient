import React from 'react';
import { useAuth } from '../context/AuthContext';
const BalanceInfo = () => {
  const { userData } = useAuth();
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
        textAlign: 'center'
      }}>
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
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <p style={{
          color: '#181810',
          letterSpacing: 'light',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          lineHeight: 'tight'
        }}>{userData?userData.punishment:<p>Cargando</p>}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <p style={{
            color: '#888d5e',
            fontSize: '0.875rem',
            fontWeight: 'normal',
            lineHeight: 'normal'
          }}>Penal</p>
        </div>
      </div>
    </div>
  );
}
  
  

export default BalanceInfo;
