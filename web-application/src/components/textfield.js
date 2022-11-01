import '../styles/style.css';

function Textfield(props) {
    if (props.float === "left") {
        return <input value= {props.text}className="input" style={{background: props.bkg, float: props.float, position: props.pos,left: "0px", marginLeft: props.mgl, marginRight: props.mgr, width: props.wth, height: props.hgt}}>
            </input>
    }
    else if(props.float === "right"){
        return <input value= {props.text}className="input" style={{background: props.bkg, float: props.float, position: props.pos,right: "0px", marginLeft: props.mgl, marginRight: props.mgr, width: props.wth, height: props.hgt}}>
            </input>
    }
    return <input>{props.comment}</input>

}



export default Textfield;