import React, { useEffect, useRef, useState } from 'react'
import { LoadScript, GoogleMap, MarkerF, InfoWindowF } from '@react-google-maps/api';
import GoogleMapPrefsTypes from '../types/GoogleMapPrefTypes';
import { Global } from '../global/Region';
import { getTestAPI } from '../services/api/OfflineAPI';
import { test2 } from '../__TEST__/test2';
import { customIcons } from '../modules/Icons';
import { getAllActiveBuses, getUserNearetBuses } from '../services/api/BusAPI';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import { waitFor } from '@testing-library/react';

export let busMapInstance: any = null || undefined;
const BusMap = (props: any): JSX.Element => {
  const googleMapAPI: string = process.env.REACT_APP_GOOGLE_MAPS_API || "";
  const [infoWindow, setInfoWindow] = useState<null | number>(null);
  const [currentMapPos, setCurrentMapPos] = useState(Global.auckland);
  const busMapRef = useRef(undefined || null);
  //Bus Datas
  const waitForBus: number = props.busWaitTime;
  const busDisplayLimits: number = 100;
  const [busData, setBusData] = useState<any[]>([]);
  const [sortedBusData, setSortedBusData] = useState<any[]>([]);


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = {
    disableDefaultUI: props.isDefaultUI,
    styles: [{
      featureType: "all",
      elementType: "labels.text",
      stylers: [
        {
          visibility: props.isLabelText ? "off" : "on"
        }

      ]
    },
    {
      featureType: "poi",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: props.isLabelIcon ? "off" : "on"
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

  const googleMapPref: GoogleMapPrefsTypes = {
    zoom: 14,
    center: currentMapPos,
    onLoad: onLoad,
    onUnmount: onUnmount,
    mapContainerStyle: { width: "100%", height: "100%", position: "fixed", zIndex: -2 },
    options: options
  }



  function onInfoWindow(item: any) {
    setInfoWindow(item);
  }

  function onLoad(map: any) {
    busMapInstance = map;
    busMapRef.current = map;
  }

  function onUnmount(): void {
    busMapRef.current = null;
  }



  useEffect(() => {
    const intervalId = setInterval(() => {
      //get the test data

      if (props.isBusLimited) {
        console.log("bus Limits enabled to 100");
      }

      if (props.isReset) {
        setBusData([]);
        setSortedBusData([]);
      }

      if (props.isBackendAPI) {
        console.log("calling Backend API");
        getAllActiveBuses().then((data: any) => {
          //console.log(data.data);
          setBusData([...data.data]);
        });
      } else {
        console.error("start backend server before you intitate");
      }

      if (props.isNearest) {
        getUserNearetBuses().then((data: any) => {
          console.log(data.data);
          setBusData([...data.data]);
        });
      }


      if (props.isOfflineAPI) {
        //console.log("Offline API call initiated")
        getTestAPI(test2).then((data: any) => {
          setBusData([...data.data]);
        });
      } else {
        setBusData([]);
        setSortedBusData([]);
      }

      busData.forEach((data: any) => {


        var bus_id: any = null;
        var label_id: any = null;
        var speed_id: any = null;
        var lat: any = null;
        var lng: any = null;
        var icon: any = { url: customIcons.busOnline.icon, scaledSize: { width: 30, height: 30 } as google.maps.Size };
        // this is for Nearest bus locations.
        if (props.isBackendAPI || props.isOfflineAPI) {
          console.log("refreshing google map" + waitForBus + "seconds");
          bus_id = data.id;
          label_id = data.vehicle.label;
          speed_id = data.vehicle.position.speed;
          lat = data.vehicle.position.latitude;
          lng = data.vehicle.position.longitude;
        }
        if (props.isNearest) {
          bus_id = data.id;
          label_id = data.label;
          speed_id = data.speed;
          lat = data.latitude;
          lng = data.longitude;
        }
        const tempBusData = {
          bus_id: bus_id,
          label_id: label_id,
          speed_id: speed_id,
          lat: lat,
          lng: lng,
          icon: icon,
        }

        //console.log(lat, lng);
        setSortedBusData((data) => {
          //   console.log(data);
          const index = data.findIndex(
            (item) => item.bus_id === bus_id
          );
          if (index === -1) {
            return [...data, tempBusData];
          } else {
            data[index] = tempBusData;
            return data;
          }

        });
      });
    }, waitForBus * 1000);
    return () => clearInterval(intervalId);
  }, [sortedBusData, busData, props.isOfflineAPI, props.isReset, props.isNearest, props.isBackendAPI, props.isBusLimited])

  return (
    <React.Fragment>
      <LoadScript googleMapsApiKey={googleMapAPI}>
        <div style={googleMapPref.mapContainerStyle}>
          <GoogleMap zoom={googleMapPref.zoom} center={googleMapPref.center} onLoad={googleMapPref.onLoad} onUnmount={googleMapPref.onUnmount} mapContainerStyle={googleMapPref.mapContainerStyle} options={googleMapPref.options}>
            <React.Fragment>
              <MarkerF icon={{ url: customIcons.userClient.icon, scaledSize: { width: 30, height: 30 } as google.maps.Size }} position={{ lat: -36.8560547, lng: 174.7619646 }} />
            </React.Fragment>
            <React.Fragment>
              {(sortedBusData !== null) && sortedBusData.map((data: any, index: number) => {
                //  console.log(data.lat, data.lng);
                const position = { lat: parseFloat(data.lat), lng: parseFloat(data.lng) };


                if (index < busDisplayLimits) {
                  if (props.isBusLimited) {
                    return <React.Fragment key={index}>
                      <MarkerF onClick={() => { onInfoWindow(data.bus_id) }} key={index} icon={data.icon} visible={props.isBusHide} position={position} >
                        {(infoWindow === data.bus_id) ? <InfoWindowF onCloseClick={() => { onInfoWindow(null) }} position={{ lat: data.lat, lng: data.lng }}>
                          <div><DirectionsBusIcon /><h5>Bus Speed: {data.speed_id}  <br /> Bus ID: {data.bus_id} </h5><ul style={{ listStyle: "none" }}><li>App ID: ???</li><li>App ID: ???</li><li>App ID: ???</li></ul></div>
                        </InfoWindowF> : null}
                      </MarkerF>
                    </React.Fragment>
                  }
                }
              })}
            </React.Fragment>
          </GoogleMap>
        </div>
      </LoadScript>
    </React.Fragment >
  );
}

export default BusMap