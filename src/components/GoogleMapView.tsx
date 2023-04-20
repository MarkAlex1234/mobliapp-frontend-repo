import {DirectionsService,DirectionsRenderer, GoogleMap ,Marker,useLoadScript, LoadScript, Circle, InfoWindow, MarkerF, InfoWindowF} from '@react-google-maps/api';
import { useState,useRef, useCallback } from 'react';
import {FaBusAlt} from 'react-icons/fa';
import {customIcons} from '../images/Images'
import { display } from '@mui/system';
import { json } from 'stream/consumers';
import SettingsBar from './SettingsBar';


const GoogleMapView = (text:boolean,icon:boolean, bus:boolean, ui:boolean) =>{
  //  const {isLoaded} = useLoadScript({googleMapsApiKey: APIKEY, });
   // const [busIconEnable, setBusIconEnable] = useState(false);
  //  if(!isLoaded) return <div> Loadingx... </div>;
    return (<div>{Map(text,icon,bus,ui)}</div>)
}


type mapPos ={
  lat:number,
  lng:number
}

const allBusDatas:mapPos[] =[
  {lat: -36.8487838, lng:174.7605749},
 {lat: -36.8488938, lng:174.7605849},
 {lat: -36.8489038, lng:174.7605949},
 {lat: -36.8490138, lng:174.7606049},
 {lat: -36.8491238, lng:174.7606149}
]

/**
 * 
 * @param this default constructor creates the bus object and data, it must be implemented in google map. 
 * @returns 
 */
const CreateBusObject:any = (positionData:mapPos, showBus:boolean):any =>{
  const [isBusWindow,setIsBusWindow] = useState(false);
  const handleBusClick = (): void =>{
    setIsBusWindow(true);
  }
  const handleBusClose= ():void =>{
    setIsBusWindow(false);
  }
  return <>  <MarkerF visible={showBus} icon={CheckBusImageStatus(true,false)} position={positionData}
  onClick={handleBusClick}/>
  {isBusWindow && <InfoWindowF onLoad={()=>{console.log("refereshed")}}onCloseClick={handleBusClose} position={positionData}>
    <div><FaBusAlt/><h5>Bus Number: CTY-202</h5><ul style={{listStyle: "none"}}><li>App ID: 0</li><li>App ID: 1</li><li>App ID: 2</li></ul></div>
    </InfoWindowF>}
    </>
}
/**
 *  Checking bus status. if its offline it should return with online. depending on parameter.
 * @param isOnline 
 * @param isMoving 
 * @returns 
 */
const CheckBusImageStatus = (isOnline: boolean, isMoving:boolean):any =>{
  if(isOnline){
    return (isMoving ? customIcons.busOnlineMov :  customIcons.busOnline)
  }else{
    return (isMoving ? customIcons.busOfflineMov : customIcons.busOffline)
  }
}

const Map = (displayText:boolean, displayIcons:boolean, displayBusIcons:boolean, displayDefualtUI:boolean) =>{
  const APIKEY:any | string = process.env.REACT_APP_GOOGLE_MAPS_API
    const AUCKLAND ={lat:-36.848461,lng:174.763336};
   
    //const dummyData = {lat: -36.8585, lng:174.7644};

    //auto find previous position setter/

    const options={
       disableDefaultUI: displayDefualtUI,
       styles: [ {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": `${displayText ? "off" : "on"}`
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": `${displayIcons ? "off" : "on"}`
          }
        ]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          {
            color: '#e9e9e9'
          },
          {
            lightness: 17
          }
        ]
      },
      {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
          {
            color: '#f5f5f5'
          },
          {
            lightness: 20
          }
        ]
      }]
    }
    return <LoadScript googleMapsApiKey={APIKEY}><GoogleMap
     zoom ={17} 
     center={AUCKLAND} 
     mapContainerStyle={{width: "100%", height: "100vh"}}
     options={options}
     >
      {(allBusDatas.map((value) => {return CreateBusObject({lat: value.lat, lng: value.lng},displayBusIcons)}))}
    </GoogleMap></LoadScript>
}

export default GoogleMapView;