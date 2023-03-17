import { GoogleMap ,useLoadScript, Marker} from '@react-google-maps/api';
const GoogleMapView = () =>{
    const APIKEY:any = process.env.REACT_APP_GOOGLE_MAPS_API
    const {isLoaded} = useLoadScript({googleMapsApiKey: APIKEY, });

    if(!isLoaded) return <div> Loading... </div>;
    return (<div><Map/></div>)
}

const Map = () =>{
    const AUCKLAND ={lat:-36.848461,lng:174.763336};

    const options={
       disableDefaultUI:true,
       styles: [ {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }]
    }
    return <GoogleMap
     zoom ={12} 
     center={AUCKLAND} 
     mapContainerStyle={{width: "100%", height: "100vh"}}
     options={options}
     ></GoogleMap>
}

export default GoogleMapView;