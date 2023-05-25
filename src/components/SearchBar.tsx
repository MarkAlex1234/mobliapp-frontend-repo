import React, { useState, useEffect } from 'react';
//importing search bar.
import TextField from '@mui/material/TextField';
import { Autocomplete, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { busMapInstance } from './BusMap';
import BusDataType from '../types/BusDataTypes';
import { DirectionsBus } from '@mui/icons-material';
import { getTestAPI } from '../services/api/OfflineAPI';
import { test2 } from '../__TEST__/test2';
import { getAllActiveBuses, getUserNearetBuses } from '../services/api/BusAPI';



const sleep = (delay: number = 0) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const SearchBar = (props: any): any => {

  const waitForSearch: number = props.busWaitTime;
  //trying to get backend data. the DTO data transfer
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly any[]>([]);
  const loading = open && options.length === 0;
  const [busDataSets, setBusDataSets] = useState<BusDataType[]>([]);
  const [tempBusDataSets, setTempBusDataSets] = useState<any[]>([]);
  //data here
  const updateMapCenter = (event: any, value: any) => {
    const instance: any = busMapInstance;
    const lat = value.lat;
    const lng = value.lng;
    instance.panTo({ lat: lat, lng: lng });
    instance.setZoom(18);
  }

  //  instance.panTo({lat: 30,lng: 30});
  useEffect(() => {
    const intervalId = setInterval(() => {

      if (props.isBusLimited) {
        console.log("bus Limits enabled to 100");
      }

      if (props.isReset) {
        setBusDataSets([]);
        setTempBusDataSets([]);
      }

      if (props.isBackendAPI) {
        console.log("calling Backend API");
        getAllActiveBuses().then((data: any) => {
          //console.log(data.data);
          setBusDataSets([...data.data]);
        });
      } else {
        console.error("start backend server before you intitate");
      }

      if (props.isNearest) {
        getUserNearetBuses().then((data: any) => {
          console.log(data.data);
          setBusDataSets([...data.data]);
        });
      }


      if (props.isOfflineAPI) {
        //console.log("Offline API call initiated")
        getTestAPI(test2).then((data: any) => {
          setBusDataSets([...data.data]);
        });
      } else {
        setBusDataSets([]);
        setTempBusDataSets([]);
      }



      busDataSets.forEach((data: any) => {
        var bus_id: any = null;
        var label_id: any = null;
        var speed_id: any = null;
        var lat: any = null;
        var lng: any = null;

        if (props.isBackendAPI || props.isOfflineAPI) {
          console.log("refreshing google map" + waitForSearch + "seconds");
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


        const busTempData = {
          bus_id: bus_id,
          label_id: label_id,
          speed_id: speed_id,
          lat: lat,
          lng: lng,

        };
        setTempBusDataSets((prevData) => {
          const index = prevData.findIndex(
            (item) => item.bus_id === bus_id
          );
          if (index === -1) {
            return [...prevData, busTempData];
          } else {
            prevData[index] = busTempData;
            return prevData;
          }
        });
      });
    }, (waitForSearch * 1000));
    return () => clearInterval(intervalId);
  }, [busDataSets, props.isBackendAPI, props.isBusLimited, props.isNearest, props.isOfflineAPI, props.isReset]);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...tempBusDataSets]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, tempBusDataSets]);


  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  //returning search bar variable.
  return (<Autocomplete
    key="mainSearch"
    id="searchBar-demo"
    size='small'
    sx={{ width: 200, position: "related", background: "white", zIndex: 1, float: 'right' }}
    open={open}
    onOpen={() => {
      setOpen(true);
    }}
    onClose={() => {
      setOpen(false);
    }}
    isOptionEqualToValue={(option, value) => option.bus_id === value.bus_id}
    getOptionLabel={(option) => (option.bus_id)}
    renderOption={(props, options) => (
      (options !== null && props !== null && options.id !== 0) ?
        <React.Fragment key={options.id}>
          <Box key={options.id} component="li" sx={{ fontSize: "10px", textAlign: "left" }} {...props}>
            <DirectionsBus style={{ margin: 2, flexShrink: 0 }} />
            Bus Number: {options.bus_id}
            <br /> BusRoutes: {options.route_id}
            <br /> BusStatus: ONLINE</Box>
        </React.Fragment>
        : <></>
    )}
    options={options}
    loading={loading}
    onChange={(event: any, value: any) => {
      if (event !== null && value !== null) {
        updateMapCenter(event, value)
      }
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Search"

        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <React.Fragment>
              {loading ? <CircularProgress color="inherit" size={10} /> : null}
              {params.InputProps.endAdornment}
            </React.Fragment>
          ),
        }}
      />
    )}
  />
  );


}

export default SearchBar;