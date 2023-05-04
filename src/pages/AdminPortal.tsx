import { Button, IconButton } from "@mui/material";
import { GrLogin } from "react-icons/gr";
import GoogleMapView from "../components/googlemap/GoogleMapView";
import GraphView from "../components/taskbar/GraphView";
import SearchBar from "../components/taskbar/SearchBar";
import SettingsBar from "../components/taskbar/SettingsBar";
import ViewLayer from "../components/taskbar/ViewLayer";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat";
import { exitAccount } from "../App";


const AdminPortal = () => {
    const navigate = useNavigate(); // Define the `navigate` function

    const handleSignOut = () => {
      exitAccount();
      navigate(-1);
      //console.log(user); // add this line
    }

    return ( <>
   
        <SearchBar/>
        <GraphView/>
        <ViewLayer/>
        <SettingsBar/>
        <Button variant="contained" style ={{top:"33px",height:"50px", position: "fixed", left:"410px"}}onClick={handleSignOut} ><GrLogin color="white"/></Button>
        </>
    );
}
 
export default AdminPortal;