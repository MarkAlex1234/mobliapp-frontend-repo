import { useState } from 'react';
import {slide as Menu} from 'react-burger-menu';
import  {BsFillLayersFill} from 'react-icons/bs';
import ViewLayerStyles from '../../assets/stylesheet/ViewLayerStyles';
import { CustomToggleButton } from './SettingsBar';

const ViewLayer = () =>{

    const [osm,setOsm] = useState(false);
    const [osmGreyScales, setOsmGreyScales] = useState(false);
    return <Menu right styles={ViewLayerStyles} customBurgerIcon={<BsFillLayersFill
        color="white"/>}>

    <ul style={{listStyleType: "none", fontSize: "14px",textAlign: "right",color:"black"}}>
    <li key={1}>OSM {CustomToggleButton("white","grey",setOsm, osm)}</li>
    <li key={2}>OSM GreyScales {CustomToggleButton("white","grey",setOsmGreyScales, osmGreyScales)}</li>

    </ul>   
    </Menu>
}

export default ViewLayer;