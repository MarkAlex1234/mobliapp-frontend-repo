import '../styles/style.css';

function Button(props) {
    if (props.img != null && props.float === "left") {
        return <div className="button" style={{background: props.bkg, float: props.float, position: props.pos,left: "0px", marginLeft: props.mgl, marginRight: props.mgr}}>
            <img src={props.img} style={{height: "50px", width: "50px"}} onClick={props.action}/>
            </div>
    }
    else if(props.img != null && props.float === "right"){
        return <div className="button" style={{background: props.bkg, float: props.float, position: props.pos, right: "0px", marginLeft: props.mgl, marginRight: props.mgr}}>
        <img src={props.img} style={{height: "50px", width: "50px"}}  onClick={props.action}/>
        </div>
    }
    return <div>{props.comment}</div>

}



export default Button;