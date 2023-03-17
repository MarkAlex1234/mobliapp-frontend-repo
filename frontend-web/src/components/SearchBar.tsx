import React, { useState, useEffect} from 'react';
//importing search bar.
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import zIndex from '@mui/material/styles/zIndex';

interface BusData{
  busNumber: string;
  busLocation: number[];
}

const sleep = (delay:number = 0) =>
{
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const SearchBar = ():any =>{
   //trying to get backend data. the DTO data transfer
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly BusData[]>([]);
  const loading = open && options.length === 0;

  //data here
  const allBusDatas =[
    {busNumber:"133", busLocation: [0.5,5],},
    {busNumber:"101", busLocation: [0.2,6],},
    {busNumber:"120", busLocation: [0.4,7],},
    {busNumber:"423", busLocation: [0.4,7],},
    {busNumber:"CB", busLocation: [0.4,7],},
    {busNumber:"CB", busLocation: [0.4,7],},
    {busNumber:"CB", busLocation: [0.4,7],},
    {busNumber:"CB", busLocation: [0.4,7],},
    {busNumber:"CB", busLocation: [0.4,7],},
    {busNumber:"CB", busLocation: [0.4,7],},
    {busNumber:"CB", busLocation: [0.4,7],},
    {busNumber:"CB", busLocation: [0.4,7],},
    {busNumber:"CB", busLocation: [0.4,7],},
    {busNumber:"CB", busLocation: [0.4,7],},
  ]


  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...allBusDatas]);
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
      isOptionEqualToValue={(option, value) => option.busNumber === value.busNumber}
      getOptionLabel={(option) => (option.busNumber + " Log" + option.busLocation[0] + "Lat" + option.busLocation[1])}
      options={options}
      loading={loading}
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