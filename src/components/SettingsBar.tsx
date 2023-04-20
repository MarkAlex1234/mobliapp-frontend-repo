import { ToggleButton,makeStyles } from '@mui/material';
import React,{useState} from 'react';
import {slide as Menu} from 'react-burger-menu';
import { BsCheckSquare, BsFillCheckSquareFill } from 'react-icons/bs';
import  {GiHamburgerMenu} from 'react-icons/gi';
import SettingsBarStyles from '../stylesheet/SettingsBarStyles';
import GoogleMapView from './GoogleMapView';
export const CustomToggleButton = (defaultCol:string, hovCol:string, setSelected:React.Dispatch<React.SetStateAction<boolean>>, selected:boolean) =>{

    return <ToggleButton
    value="check"
    selected={selected}
    size ="small"
    sx={{
      "&.Mui-selected": {
        backgroundColor: `${hovCol}`,
        color: "white",
        "&:hover": {
          backgroundColor: "grey"
        }
      },
      "&:hover": {
        backgroundColor: `${defaultCol}`,
        color: "black"
      }
    }}
    onChange={() => {
      setSelected(!selected);
    }}
  >
    <BsCheckSquare color="black"/>
  </ToggleButton>
}

const SettingsBar = () => {
    //const [selected,setSelected] = useState(false);
    const [icon, setIcon] = useState(true);
    const [text, setText] = useState(true);
    const [busIcons,setBusIcons] = useState(true);
    const [ui,setUI] = useState(true);
return <><Menu styles={SettingsBarStyles} customBurgerIcon={<GiHamburgerMenu
color="white"/>}>
    
    <ul style={{listStyleType: "none", fontSize: "14px",textAlign: "right"}}>
    <li key={1}>Hide All Label Icons {CustomToggleButton("white","grey",setIcon, icon)}</li>
    <li key={2}>Hide All Label Texts {CustomToggleButton("white","grey",setText, text)}</li>
    <li key={3}>Show All Bus Icons {CustomToggleButton("white","grey", setBusIcons, busIcons)}</li>
    <li key={4}>Hide Default UI Tools {CustomToggleButton("white","grey", setUI, ui)}</li>
    </ul>
   

</Menu>
       {GoogleMapView(text,icon,busIcons,ui)}
       </>
}

export default SettingsBar;