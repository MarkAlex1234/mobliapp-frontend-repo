import React from 'react';
import { BsStackOverflow } from 'react-icons/bs';

const StyleButton =   {
    bmBurgerButton: {
    position: 'fixed',
    width: '25px',
    height: '28px',
    right: '85px',
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
    width: '50%'
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
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmItem: {
    display: 'inline-block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

const GrpahViewStyles = () => {
    return StyleButton;
}

export default GrpahViewStyles();