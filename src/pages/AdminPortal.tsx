import GoogleMapView from "../components/googlemap/GoogleMapView";
import GraphView from "../components/taskbar/GraphView";
import SearchBar from "../components/taskbar/SearchBar";
import SettingsBar from "../components/taskbar/SettingsBar";
import ViewLayer from "../components/taskbar/ViewLayer";


const AdminPortal = () => {
    return ( <>
        <SearchBar/>
        <GraphView/>
        <ViewLayer/>
        <SettingsBar/>
        </>
    );
}
 
export default AdminPortal;