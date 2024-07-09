import React from 'react';

const BalanceInfo = () => (
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
      }}>$0.00</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <p style={{
          color: '#888d5e',
          fontSize: '0.875rem',
          fontWeight: 'normal',
          lineHeight: 'normal'
        }}>Balance</p>
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
      }}>0</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <p style={{
          color: '#888d5e',
          fontSize: '0.875rem',
          fontWeight: 'normal',
          lineHeight: 'normal'
        }}>Free Rides</p>
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
      }}>0</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <p style={{
          color: '#888d5e',
          fontSize: '0.875rem',
          fontWeight: 'normal',
          lineHeight: 'normal'
        }}>Promos</p>
      </div>
    </div>
  </div>
);

export default BalanceInfo;
