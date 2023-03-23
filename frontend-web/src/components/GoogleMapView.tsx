import { GoogleMap ,useLoadScript, Marker} from '@react-google-maps/api';
import { url } from 'inspector';
// import { AppService } from "../../backend/src/app.service";

const GoogleMapView = () =>{
    const APIKEY:any = process.env.REACT_APP_GOOGLE_MAPS_API
    const {isLoaded} = useLoadScript({googleMapsApiKey: APIKEY, });

    if(!isLoaded) return <div> Loading... </div>;
    return (<div><Map/></div>)

  }
  
//   const apikey = process.env.REACT_APP_GOOGLE_MAPS_API;

//   async function fetchLocationData(): Promise<any> {
//     const apiUrl = apikey;
//     const response = await fetch(apiUrl);
//     const data = await response.json();
//     return data;
//   }

// fetchLocationData()
// .then((data) => {
//   const location = data.results[0].geometry.location;
//   const lat = location.lat;
//   const lng = location.lng;
//   console.log(`Latitude: ${lat}, Longitude: ${lng}`); 
// })
// .catch((error) => console.error(error));

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