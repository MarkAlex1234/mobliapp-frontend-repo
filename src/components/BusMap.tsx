import React, { useEffect, useRef, useState } from 'react'
import { LoadScript,GoogleMap, MarkerF } from '@react-google-maps/api';
import GoogleMapPrefsTypes from '../types/GoogleMapPrefTypes';
import { Global } from '../global/Region';
import { getTestAPI } from '../services/api/OfflineAPI';
import { arrayTestData } from '../__TEST__/test';
import { customIcons } from '../modules/Icons';


export let busMapInstance:any =  null || undefined;
const BusMap = (props:any):JSX.Element => {
  const googleMapAPI:string = process.env.REACT_APP_GOOGLE_MAPS_API || "";
  const [currentMapPos,setCurrentMapPos] = useState(Global.auckland);
  const busMapRef = useRef(undefined || null);
  //Bus Datas
  const waitForBus:number =5;
  const [busData,setBusData] = useState<any[]>([]);
  const [sortedBusData,setSortedBusData] = useState<any[]>([]);
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

  useEffect(()=>{
    const intervalId = setInterval(()=> {
      //get the test data
      console.log("refreshing google map")
      getTestAPI(arrayTestData).then((data:any) => {
        setBusData([...data]);
      }); 
      busData.forEach((data:any)=>{
        const route_id = data.response.entity[0].vehicle.trip.route_id;
        const label_id = data.response.entity[0].vehicle.vehicle.label;
        const speed_id = data.response.entity[0].vehicle.position.speed;
        const lat = data.response.entity[0].vehicle.position.latitude;
        const lng = data.response.entity[0].vehicle.position.longitude;
        
        const tempBusData={
          route_id : route_id,
          label_id : label_id,
          speed_id : speed_id,
          lat: lat,
          lng: lng,
        }
        setSortedBusData((data) => {
          const index = data.findIndex(
            (item) => item.label_id === label_id
          );
          if(index === -1){
            return[...data, tempBusData];
          }else{
            data[index] = tempBusData;
            return data;
          }
  
        });
      });
    }, waitForBus * 1000);
    return () => clearInterval(intervalId);
  },[sortedBusData,busData])

  return (
    <React.Fragment>
      <LoadScript googleMapsApiKey={googleMapAPI}>
        <div style={googleMapPref.mapContainerStyle}>
      <GoogleMap zoom={googleMapPref.zoom} center={googleMapPref.center} onLoad={googleMapPref.onLoad} onUnmount={googleMapPref.onUnmount} mapContainerStyle={googleMapPref.mapContainerStyle} options={googleMapPref.options}>
      <MarkerF position={Global.auckland}/>
      <React.Fragment>
        {(sortedBusData !== null) && sortedBusData.map((data:any,index:number) => {
          return <React.Fragment key={index}>
            <MarkerF key={index} icon={{url: customIcons.busOnline.icon,size: new google.maps.Size(45,45) }} visible={props.isBusHide} position={{lat: data.lat, lng: data.lng}}/>
          </React.Fragment>
        })}
      </React.Fragment>
      </GoogleMap>
      </div>
      </LoadScript>
    </React.Fragment>
  );
}

export default BusMap