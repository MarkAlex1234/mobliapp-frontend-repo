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
import BusMap from './BusMap';
import SearchBar from './SearchBar';


type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function SideSettings(props:any) {
  //my preference settings
  const [hideLabelIcons,setHideLabelIcons] = React.useState(true);
  const [hideLabelTexts,setHideLabelTexts] = React.useState(true);
  const [hidewBusIcons,setHideBusIcons] = React.useState(false);
  const [hideTools, setHideTools] = React.useState(true);
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
        <ListItem key={"hL"} sx={{fontSize:12}}><div>Hide All Label Icons</div> <ToggleButton sx={{width: 20, height:20}} value="check" selected={hideLabelIcons} onChange={()=>{setHideLabelIcons(!hideLabelIcons)}}><CheckIcon sx={{width:17,height:17}}/></ToggleButton></ListItem>
        <ListItem key={"hT"} sx={{fontSize:12}}><div>Hide All Label Texts</div> <ToggleButton  sx={{width: 20, height:20}}   value="check" selected={hideLabelTexts} onChange={()=>{setHideLabelTexts(!hideLabelTexts)}}><CheckIcon sx={{width:17,height:17}}/></ToggleButton></ListItem>
        <ListItem key={"hB"} sx={{fontSize:12}}><div>Hide All Bus Icons</div> <ToggleButton sx={{width: 20, height:20}}    value="check" selected={hidewBusIcons} onChange={()=>{setHideBusIcons(!hidewBusIcons)}}><CheckIcon sx={{width:17,height:17}}/></ToggleButton></ListItem>
        <ListItem key={"hUIT"}sx={{fontSize:12}}><div>Hide UI Tools</div> <ToggleButton sx={{width: 20, height:20}}  value="check" selected={hideTools} onChange={()=>{setHideTools(!hideTools)}}><CheckIcon sx={{width:17,height:17}}/></ToggleButton></ListItem>
      </List>
    </Box>
  );
  return (
    <div style= {{zIndex:1}}>
    <div style={{position:"fixed",left:"10%", zIndex: 1, float:'left'}}>
        <React.Fragment key={"left"}>
          <Button onClick={toggleDrawer("left", true)}><MenuIcon/></Button>
          <SearchBar/>
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
    <BusMap isLabelIcon={hideLabelIcons} isLabelText={hideLabelTexts} isDefaultUI={hideTools} />
    </div>
  );
}
