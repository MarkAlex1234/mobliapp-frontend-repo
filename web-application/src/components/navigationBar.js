import Button from '../components/button';
import Textfield from '../components/textfield';
import test from '../images/test.png';
import SummaryImg from '../images/summary.png';
import LayerImg from '../images/layers.png';
import SearchBarImg from '../images/searchbar.png';
function NavigationBar() {
    return (<>
        <Button name="sup" img={test} bkg="#1C71D2" float="left" pos="absolute" action={function () { alert("hellothere") }} />
        <Textfield bkg="#1C71D2" float="left" pos="absolute" mgl="70px" hgt="45px" text="search something..."/>
        <Button name="sup" img={SearchBarImg} bkg="#1C71D2" float="left" pos="absolute" mgl="325px" action={function () { alert("hellothere") }} />
        <Button name="sup" img={SummaryImg} bkg="#1C71D2" float="right" pos="absolute" mgr="70px" action={function () { alert("hellothere") }} />
        <Button name="sup" img={LayerImg} bkg="#1C71D2" float="right" pos="absolute" action={function () { alert("hellothere") }} />

    </>
    );
}

export default NavigationBar;