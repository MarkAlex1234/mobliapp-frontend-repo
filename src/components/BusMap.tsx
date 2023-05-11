import React, { useEffect, useRef, useState } from 'react'
import { LoadScript,GoogleMap } from '@react-google-maps/api';
import GoogleMapPrefsTypes from '../types/GoogleMapPrefTypes';
import { Global } from '../global/Region';


export let busMapInstance:any =  null || undefined;
const BusMap = (props:any):JSX.Element => {
  const googleMapAPI:string = process.env.REACT_APP_GOOGLE_MAPS_API || "";
  const [currentMapPos,setCurrentMapPos] = useState(Global.auckland);
  const busMapRef = useRef(undefined || null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = {
    disableDefaultUI: props.isDefaultUI,
    styles: [{
      featureType: "all",
      elementType: "labels.text",
      stylers: [
        {
          visibility : props.isLabelText ? "off" : "on" }
        
      ]
    },
    {
      featureType: "poi",
      elementType: "labels.icon",
      stylers: [
        {
          visibility:  props.isLabelIcon ? "off" : "on"
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

  const googleMapPref:GoogleMapPrefsTypes = {
    zoom: 14,
    center: currentMapPos,
    onLoad: onLoad,
    onUnmount: onUnmount,
    mapContainerStyle: {width:"100%",height:"100%",position:"fixed", zIndex: -2},
    options: options
  }

  function onLoad(map: any){
    busMapInstance = map;
    busMapRef.current = map;
  }

  function onUnmount():void{
    busMapRef.current = null;
  }

  return (
    <React.Fragment>
      <LoadScript googleMapsApiKey={googleMapAPI}>
        <div style={googleMapPref.mapContainerStyle}>
      <GoogleMap zoom={googleMapPref.zoom} center={googleMapPref.center} onLoad={googleMapPref.onLoad} onUnmount={googleMapPref.onUnmount} mapContainerStyle={googleMapPref.mapContainerStyle} options={googleMapPref.options}>

      </GoogleMap>
      </div>
      </LoadScript>
    </React.Fragment>
  );
}

export default BusMap