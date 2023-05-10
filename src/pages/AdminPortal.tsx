import React from 'react'
import SideSettings from '../components/SideSettings'
import SideGraphView from '../components/SideGraphView'
import {Images} from '../modules/Logo'
const AdminPortal = (props:any) => {
  return (
    <div style= {{backgroundColor:"black", height:"35px",opacity: "0.8"}}>
    <SideSettings onClick={props.onClick}></SideSettings>
    <img src={Images.Mobli.url} style={{width:"35px", height:"35px",position:"fixed"}}/>
    <SideGraphView/>
    </div>
  );
}

export default AdminPortal