import { fontStyle } from '@mui/system';
import React from 'react';

const StyleButton =   {
    bmBurgerButton: {
    position: 'fixed',
    width: '25px',
    height: '28px',
    left: '36px',
    top: '36px',
    background : '#0860c4',
    border: '8px solid rgba(0, 0, 0, 0.05)',
    borderRadius: '5px',
  },
  bmBurgerBars: {
    background: 'white'
  },
  bmBurgerBarsHover: {
    background: '#a90000'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: 'black'
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',

  },
  bmMenu: {
    background: 'white',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
    overflow:'hidden'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: 'black',
    padding: '0.8em',
   // listStyleType: 'none'
  },
  bmItem: {
    display: 'inline-block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

const SettingsBarStyles = () => {
    return StyleButton;
}

export default SettingsBarStyles();