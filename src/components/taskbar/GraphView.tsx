import React from 'react';
import {slide as Menu} from 'react-burger-menu';
import  {GoGraph} from 'react-icons/go';
import GraphViewStyles from '../assets/stylesheet/GraphViewStyles';
const GraphView = () =>{
    return <><Menu right styles={GraphViewStyles} customBurgerIcon={<GoGraph
color="white"/>}>
    
    <ul>
    <li>Test</li>
    <li>Test</li>
    <li>Test</li>
    </ul>
   

</Menu>
 </> 
}

export default GraphView;