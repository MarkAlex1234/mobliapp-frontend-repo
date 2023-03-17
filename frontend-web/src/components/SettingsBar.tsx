import React from 'react';
import {slide as Menu} from 'react-burger-menu';
import  {GiHamburgerMenu} from 'react-icons/gi';
import SettingsBarStyles from '../stylesheet/SettingsBarStyles';

const SettingsBar = () => {
return <Menu styles={SettingsBarStyles} customBurgerIcon={<GiHamburgerMenu
color="white"/>}>
    <ul>
    <li>meow</li>
    <li>meow</li>
    <li>meow</li>
    </ul>
   

</Menu>

}

export default SettingsBar;