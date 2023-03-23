import {slide as Menu} from 'react-burger-menu';
import  {BsFillLayersFill} from 'react-icons/bs';
import ViewLayerStyles from '../stylesheet/ViewLayerStyles';

const ViewLayer = () =>{
    return <Menu right styles={ViewLayerStyles} customBurgerIcon={<BsFillLayersFill
        color="white"/>}>

        
    </Menu>
}

export default ViewLayer;