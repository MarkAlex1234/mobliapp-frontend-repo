import React from 'react'
import SideSettings from '../components/SideSettings'
import SideGraphView from '../components/SideGraphView'
import {Images} from '../modules/Logo'

import BusMap from '../components/BusMap'
const AdminPortal = (props:any) => {
  return (
    <React.Fragment>
    <div style= {{backgroundColor:"white",width:"100%", height:"40px",zIndex: 1}}>
    <SideSettings onClick={props.onClick}/>
    <img src={Images.Mobli.url} style={{width:"35px", height:"35px",position:"fixed", zIndex:0}}/>
    <SideGraphView/>
    </div>
     </React.Fragment>
  );
}

export default AdminPortal