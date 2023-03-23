import React from 'react';
import {slide as Menu} from 'react-burger-menu';
import  {GoGraph} from 'react-icons/go';
import GrpahViewStyles from '../stylesheet/GrpahViewStyles';
const GraphView = () =>{
    return <><Menu right styles={GrpahViewStyles} customBurgerIcon={<GoGraph
color="white"/>}>
    
    <ul>
    <li>meow</li>
    <li>meow</li>
    <li>meow</li>
    </ul>
   

</Menu>
 </> 
}

export default GraphView;