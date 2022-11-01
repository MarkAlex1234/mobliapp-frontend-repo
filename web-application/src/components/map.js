import { react } from "react-dom";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import '../styles/style.css';
import mapPicture from '../images/Googlemap.PNG';

function MapContainer() {
    //something with the api key.
    const { isLoaded } = useJsApiLoader({ googleMapsApiKey: "" });
    if (!isLoaded) {
        return <div> Loading. .. </div>;
    } else { 
return (<div> 
{/* <p style> Google Map JavaScript API needs To be Enabled(Place, Map)</p> */}
<img src={mapPicture} style={{width: "100%", height: "100%"}} />
            <GoogleMap
            zoom={10} 
            center={{ lat: 44, lng: -80 }} 
            mapContainerStyle={{width:'100%', height: '100%'}}
            >
            </GoogleMap>
            </div>)
    }
}

export default MapContainer;