import { DirectionsService, DirectionsRenderer, GoogleMap, Marker, useLoadScript, LoadScript, Circle, InfoWindow, MarkerF, InfoWindowF, useGoogleMap } from '@react-google-maps/api';
import { useState, useRef, useCallback, useEffect } from 'react';
import { FaBusAlt, FaUserAstronaut } from 'react-icons/fa';
import { customIcons } from '../../components/Icons';

//test Type
import { arrayTestData, testData } from '../../services/test';
import { stringify } from 'querystring';
import { responsiveFontSizes } from '@mui/material';
import { busDataType } from '../../interface/busDataType';
import React from 'react';
const GoogleMapView = (text: boolean, icon: boolean, bus: boolean, ui: boolean) => {
  //  const {isLoaded} = useLoadScript({googleMapsApiKey: APIKEY, });
  // const [busIconEnable, setBusIconEnable] = useState(false);
  //  if(!isLoaded) return <div> Loadingx... </div>;
  return (<div>{Map(text, icon, bus, ui)}</div>)
}

export let mapInstnace:any = null;



/**
 * 
 * @param this default constructor creates the bus object and data, it must be implemented in google map. 
 * @returns 
 */
const CreateBusObject = (data:any, showBus: boolean, url:string): any => {
  const [animation, setAnimation] = useState(false);
  const [icon,setIcon] = useState(customIcons.busOnline);
  useEffect(() => {

    //Sync bus locaitons
    const intervalId = setInterval (() => {
      setAnimation(!animation);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [animation]);

  function onLoad(marker:any) {
    setIcon(customIcons.busOnlineMov);
  }

  function onUnmount(marker:any) {
    setIcon(customIcons.busOnline);;
  }

  const handleIconChange = (marker:any) =>{
    const moving:any = customIcons.busOnlineMov;
    const online:any = customIcons.busOnline;
    if(animation){
      marker.setIcon(online);
      setIcon(online);
    }
    else{
      marker.setIcon(moving);
      setIcon(moving);
    }
   
    
  }

  //console.log(animation);
  const [isBusWindow, setIsBusWindow] = useState(false);
  const handleBusClick = (): void => {
    setIsBusWindow(true);
  }
  const handleBusClose = (): void => {
    setIsBusWindow(false);
  }
  return  <React.Fragment>{(mapInstnace !== null) && <MarkerF animation={undefined} onLoad={onLoad} onUnmount={onUnmount} visible={showBus} 
  icon={{url: url, size : new google.maps.Size(35,35)}} position={{lat: data.lat, lng: data.lng}}
    onClick={handleBusClick}>
    {isBusWindow && <InfoWindowF onCloseClick={handleBusClose} position={{lat: data.lat, lng: data.lng}}>
      <div><FaBusAlt /><h5>Bus Number: TEST  <br/> Bus Route: TEST </h5><ul style={{ listStyle: "none" }}><li>App ID: 0</li><li>App ID: 1</li><li>App ID: 2</li></ul></div>
    </InfoWindowF>}</MarkerF>} </React.Fragment>
  
}
/**
 *  Checking bus status. if its offline it should return with online. depending on parameter.
 * @param isOnline 
 * @param isMoving 
 * @returns 
 */
const CheckBusImageStatus = (isOnline: boolean, isMoving: boolean): any => {
  if (isOnline) {
    return (isMoving ? customIcons.busOnlineMov : customIcons.busOnline)
  } else {
    return (isMoving ? customIcons.busOfflineMov : customIcons.busOffline)
  }
}

export async function test1(data:any){
  const tempData = data;
  try{
    //console.log(JSON.stringify(tempData));
   // console.log(JSON.parse(tempData));
    return tempData;
      //it does not return.
  }
  catch(error)
  {
     console.log(error)
  }
}


export async function test2(data:any[]) {
  const tempData:any[] = data;
  try {
    // const tempData = data;
    // tempData.map((value:any)=> {
    //   console.log("VALUE:" + value.response.entity[0].vehicle.position.latitude);
    // })
   // console.log(JSON.stringify(tempData));
    return tempData;
  }
  catch (error) {
    console.error(error);
  }
}


const Map = (displayText: boolean, displayIcons: boolean, displayBusIcons: boolean, displayDefualtUI: boolean) => {
  const APIKEY: any | string = process.env.REACT_APP_GOOGLE_MAPS_API
  const AUCKLAND = { lat: -36.848461, lng: 174.763336 };
  const [currentPosition, setCurrentPosition] = useState(AUCKLAND);
  const mapRef = useRef(null);
  const [busData,setBusData] = useState<busDataType>({route_id: "", label_id :"", speed: 0,lat: 0,lng: 0,isWindow: false});
  const [busDataSets,setBusDataSets]  = useState<busDataType[]>([]);
  const [tempBusDataSets,setTempBusDataSets]  = useState<any[]>([]);
  const [markerPosition, setMarkerPosition] = useState({ lat: -36.8672014, lng:174.759981 });
  //test Center;
  // calling test case
  useEffect(() => {
    const intervalId = setInterval(() => {
      test2(arrayTestData).then((data: any) => {
        setBusDataSets([...data]);
      });
      busDataSets.forEach((data: any) => {
        const route_id = data.response.entity[0].vehicle.trip.route_id;
        const label_id = data.response.entity[0].vehicle.vehicle.label;
        const speed_id = data.response.entity[0].vehicle.position.speed;
        const lat = data.response.entity[0].vehicle.position.latitude;
        const lng = data.response.entity[0].vehicle.position.longitude;
        const isWindow = false;
        const busTempData = {
          route_id: route_id,
          label_id: label_id,
          speed: speed_id,
          lat: lat,
          lng: lng,
          isWindow: isWindow,
        };
        setTempBusDataSets((prevData) => {
          const index = prevData.findIndex(
            (item) => item.label_id === label_id
          );
          if (index === -1) {
            return [...prevData, busTempData];
          } else {
            prevData[index] = busTempData;
            return prevData;
          }
        });
      });
    }, 3000);
    return () => clearInterval(intervalId);
  }, [busDataSets]);

   //console.log(...tempBusDataSets);
 // console.log(busDataSets);

  useEffect(() => {

    //Sync bus locaitons
    const intervalId = setInterval (() => {
      test1(testData).then((data:any)=>{
        const route_id = data.response.entity[0].vehicle.trip.route_id;
        const label_id = data.response.entity[0].vehicle.vehicle.label;
        const speed_id = data.response.entity[0].vehicle.position.speed;
        const lat = data.response.entity[0].vehicle.position.latitude;
        const lng = data.response.entity[0].vehicle.position.longitude;
        const isWindow = false;
        const busTempData = {route_id:route_id,label_id: label_id,speed: speed_id,lat :lat,lng:lng, isWindow: isWindow};
       // console.log(busTempData);    
        setBusData(busTempData);
      })   
        
    }, 3000);
    return () => clearInterval(intervalId);
  }, [busData]);



  const onLoad = (map: any) => {
    mapInstnace = map;
    mapRef.current = map;
  };

  const onUnmount = () => {
   // mapInstnace = null;
    mapRef.current = null;
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
      },
      () => null,
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        // moving forward
        const positionData: any = {lat: markerPosition.lat, lng: markerPosition.lng}
        setMarkerPosition(positionData);
      }
      catch (error) {
        console.error(error);
      }
    }, 1500);
    return () => clearInterval(intervalId);
  }, [markerPosition]);

  //const dummyData = {lat: -36.8585, lng:174.7644};

  //auto find previous position setter/

  const options = {
    disableDefaultUI: displayDefualtUI,
    styles: [{
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

  const [selected, setSelected] = useState<null | number>(null);

  const onSelect = (item:any) =>{
    setSelected(item);
  }

  return <LoadScript googleMapsApiKey={APIKEY}><GoogleMap
    zoom={14}
    center={currentPosition}
    onLoad={onLoad}
    onUnmount={onUnmount}
    mapContainerStyle={{ width: "100%", height: "100vh" }}
    options={options}
  >
    {/* Animation Test */}
{CreateBusObject(markerPosition,displayBusIcons, customIcons.userClient.icon)};

   <React.Fragment>
  {(tempBusDataSets !== null) && tempBusDataSets.map((data:any)=> {return <MarkerF animation={undefined} key={data.label_id} visible={displayBusIcons} icon={{url: customIcons.busOnline.icon,size: new google.maps.Size(45,45) }} position={{lat: data.lat, lng: data.lng}}
    onClick={() =>{onSelect(data.label_id)}}>
    { (selected === data.label_id) ?  <InfoWindowF onCloseClick={()=>{setSelected(null)}} position={{lat: data.lat, lng: data.lng}}>
      <div><FaBusAlt /><h5>Bus Number: {data.label_id}  <br/> Bus Route: {data.route_id} </h5><ul style={{ listStyle: "none" }}><li>App ID: 0</li><li>App ID: 1</li><li>App ID: 2</li></ul></div>
    </InfoWindowF> : <></>  }
    </MarkerF>})}
    </React.Fragment>

  </GoogleMap></LoadScript>
}

export default GoogleMapView;