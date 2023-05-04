import React, { useState, useEffect} from 'react';
//importing search bar.
import TextField from '@mui/material/TextField';
import { Autocomplete, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import zIndex from '@mui/material/styles/zIndex';
import { busDataType } from '../../interface/busDataType';
import { arrayTestData } from '../../services/test';
import { amber } from '@mui/material/colors';
import { mapInstnace, test2 } from '../googlemap/GoogleMapView';
import { FaBusAlt } from 'react-icons/fa';




const sleep = (delay:number = 0) =>
{
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const SearchBar = ():any =>{

  
   //trying to get backend data. the DTO data transfer
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly any[]>([]);
  const loading = open && options.length === 0;
  const [busDataSets,setBusDataSets]  = useState<busDataType[]>([]);
  const [tempBusDataSets,setTempBusDataSets]  = useState<any[]>([]);
  //data here
  const updateMapCenter = (event:any, value:any)=>{
    const instance:any = mapInstnace;
    const lat = value.lat;
    const lng = value.lng;
    instance.panTo({lat:lat, lng:lng});
    instance.setZoom(18);
  }

//  instance.panTo({lat: 30,lng: 30});
  useEffect(() => {
    const intervalId = setInterval(() => {

    //  console.log(mapInstnace);
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
  }, [loading]);

  
  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

    //returning search bar variable.
    return ( <Autocomplete
      style={{
        left: "95px",
        top: "30px",
        position: "absolute",
        background: "white",
        zIndex: "1",
      }}
      id="searchBar-demo"
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.label_id === value.label_id}
      getOptionLabel={(option) => (option.label_id )}
      renderOption ={(props,options) =>(
        <Box component="li" sx={{fontSize: "12px",textAlign:"left"}} {...props}><FaBusAlt style={{margin: 2, flexShrink: 0}}/> Bus Number: {options.label_id}
        <br/> BusRoutes: {options.route_id}
        <br/> BusStatus: ONLINE</Box>
    )}
      options={options}
      loading={loading}
      onChange={(event:any,value:any) =>{ updateMapCenter(event,value)}}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
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