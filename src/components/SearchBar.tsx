import React, { useState, useEffect} from 'react';
//importing search bar.
import TextField from '@mui/material/TextField';
import { Autocomplete, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { busMapInstance } from './BusMap';
import BusDataType from '../types/BusDataTypes';
import { DirectionsBus } from '@mui/icons-material';
import { arrayTestData } from '../__TEST__/test';
import { getTestAPI } from '../services/api/OfflineAPI';
import { test2 } from '../__TEST__/test2';




const sleep = (delay:number = 0) =>
{
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const SearchBar = ():any =>{

  const waitForSearch:number = 3;
   //trying to get backend data. the DTO data transfer
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly any[]>([]);
  const loading = open && options.length === 0;
  const [busDataSets,setBusDataSets]  = useState<BusDataType[]>([]);
  const [tempBusDataSets,setTempBusDataSets]  = useState<any[]>([]);
  //data here
  const updateMapCenter = (event:any, value:any)=>{
    const instance:any = busMapInstance;
    const lat = value.lat;
    const lng = value.lng;
    instance.panTo({lat:lat, lng:lng});
    instance.setZoom(18);
  }

//  instance.panTo({lat: 30,lng: 30});
  useEffect(() => {
    const intervalId = setInterval(() => {
      //change this api. when u calling differnt datasets
      getTestAPI(test2).then((data: any) => {
        setBusDataSets([...data.data]);
      });
      console.log("Refreshing  data sets");
      busDataSets.forEach((data: any) => {
        const route_id = data.id;
        const label_id = data.vehicle.vehicle.label;
        const speed_id = data.vehicle.position.speed;
        const lat = data.vehicle.position.latitude;
        const lng = data.vehicle.position.longitude;
       
        const busTempData = {
          route_id: route_id,
          label_id: label_id,
          speed: speed_id,
          lat: lat,
          lng: lng,
       
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
    }, (3 * 1000));
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
      id="searchBar-demo"
      size='small'
      sx={{ width: 200,  position:"related",background:"white",zIndex:1,float:'right' }}
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
        (options !== null && props !== null && options.id !== 0) ? 
        <React.Fragment key={options.id}>
        <Box component="li" sx={{fontSize: "10px",textAlign:"left"}} {...props}>
        <DirectionsBus style={{margin: 2, flexShrink: 0}}/> 
        Bus Number: {options.label_id}
        <br/> BusRoutes: {options.route_id}
        <br/> BusStatus: ONLINE</Box>
        </React.Fragment>
        : <></>
    )}
      options={options}
      loading={loading}
      onChange={(event:any,value:any) =>{ 
        if(event !== null && value !== null){
          updateMapCenter(event,value)}}}
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