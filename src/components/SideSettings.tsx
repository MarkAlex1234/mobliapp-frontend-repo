import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CheckIcon from "@mui/icons-material/Check";
import { ToggleButton } from '@mui/material';
import { Global } from '../global/Region';
import { busMapInstance } from './BusMap';
type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function SideSettings(props:any) {
  //my preference settings
  const [hideLabelIcons,setHideLabelIcons] = React.useState(false);
  const [hideLabelTexts,setHideLabelTexts] = React.useState(false);
  const [hidewBusIcons,setHideBusIcons] = React.useState(false);
  const [hideTools, setHideTools] = React.useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };
    React.useEffect(()=>{
      if(hideLabelIcons){
 
        console.log("true");
      }else{

        console.log("false");
      }
    },[hideLabelIcons])
  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={undefined}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>Hide All Label Icons <ToggleButton size="small" value="check" selected={hideLabelIcons} onChange={()=>{setHideLabelIcons(!hideLabelIcons)}}><CheckIcon/></ToggleButton></ListItem>
        <ListItem>Hide All Label Texts <ToggleButton size="small"  value="check" selected={hideLabelTexts} onChange={()=>{setHideLabelTexts(!hideLabelTexts)}}><CheckIcon/></ToggleButton></ListItem>
        <ListItem>Hide All Bus Icons <ToggleButton  size="small" value="check" selected={hidewBusIcons} onChange={()=>{setHideBusIcons(!hidewBusIcons)}}><CheckIcon/></ToggleButton></ListItem>
        <ListItem>Hide UI Tools <ToggleButton  size="small"  value="check" selected={hideTools} onChange={()=>{setHideTools(!hideTools)}}><CheckIcon/></ToggleButton></ListItem>
      </List>
    </Box>
  );
  return (
    <div style={{position:"fixed",left:"10%"}}>
        <React.Fragment key={"left"}>
          <Button onClick={toggleDrawer("left", true)}><MenuIcon/></Button>
          <Button onClick={props.onClick}><LogoutIcon/></Button>
          <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
        </React.Fragment>
        
    </div>
  );
}
