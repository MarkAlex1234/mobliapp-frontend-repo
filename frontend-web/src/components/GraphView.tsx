import React from 'react';
import {slide as Menu} from 'react-burger-menu';
import  {GoGraph} from 'react-icons/go';
import GrpahViewStyles from '../stylesheet/GrpahViewStyles';

const GraphView = () =>{
    return <Menu right styles={GrpahViewStyles} customBurgerIcon={<GoGraph
color="white"/>}>
    <ul>
    <li>Total Summary Report</li>
    <li>Total Bus status</li>
    <li>Total Moblie Detection Rates</li>
    <li>Total Detection Attempts</li>
    </ul>
   

</Menu>
}

export default GraphView;