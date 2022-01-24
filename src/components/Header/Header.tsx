import React, { useState } from 'react';
import { Autocomplete } from "@react-google-maps/api"; 
import { AppBar,Toolbar,Typography,Input, Box, InputBase } from "@material-ui/core"; 
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './styles';

const Header = ({setCoordinates}:{setCoordinates:Function}) => {
  const classes = useStyles();
  const [autocomplete,setAutocomplete]= useState<any>({});
  const coordinatesByDefault = {lat:-2.150042599999992,lng:-79.9117772};

  const onPlaceChanged = () => {
    const lat = autocomplete?.getPlace()?.geometry?.location?.lat()|| coordinatesByDefault.lat;
    const lng = autocomplete?.getPlace()?.geometry?.location?.lng()|| coordinatesByDefault.lng;
    setCoordinates({lat,lng});
  }
  const onLoad=(autoC:any)=>setAutocomplete(autoC);

  return (
    <AppBar position="static">
      <Toolbar  className={classes.toolbar}>
      
        <Typography variant="h5" className={classes.title}>
          Travel Advisor
        </Typography>
        <Box display="flex" >
          <Typography variant="h5" className={classes.title}>
            Explore new places
          </Typography>
          <Autocomplete onLoad = {onLoad}  onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase placeholder="Search..." classes={{root:classes.inputRoot,input:classes.inputInput}}/>
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>


  );
};

export default Header;
