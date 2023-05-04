import React from 'react';
import {slide as Menu} from 'react-burger-menu';
import  {GoGraph} from 'react-icons/go';
import GraphViewStyles from '../../assets/stylesheet/GraphViewStyles';
import BasicTable from './GraphTable';
const GraphView = () =>{
    return <><Menu right styles={GraphViewStyles} customBurgerIcon={<GoGraph
color="white"/>}>
    
   {BasicTable()}
   

</Menu>
 </> 
}

export default GraphView;