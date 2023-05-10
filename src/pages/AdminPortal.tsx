import React from 'react'
import SideSettings from '../components/SideSettings'
import SideGraphView from '../components/SideGraphView'
import {Images} from '../modules/Logo'

import BusMap from '../components/BusMap'
const AdminPortal = (props:any) => {
  return (
    <React.Fragment>
    <div style= {{backgroundColor:"white", height:"35px",opacity: "0.8"}}>
    <SideSettings onClick={props.onClick}></SideSettings>
    <img src={Images.Mobli.url} style={{width:"35px", height:"35px",position:"fixed"}}/>
    <SideGraphView/>
    </div>
     <BusMap/>
     </React.Fragment>
  );
}

export default AdminPortal