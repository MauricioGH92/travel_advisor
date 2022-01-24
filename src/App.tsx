import React,{useEffect,useState} from 'react';
import { CssBaseline,Grid } from '@material-ui/core';

import { getPlacesData } from "./api";
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import {IPlace} from './interfaces/genericInterface';

const coordinatesByDefault = {lat:-2.150042599999992,lng:-79.9117772};

const App = () => {
  const [places,setPlaces] =useState<Array<IPlace>>([]);
  const [coordinates,setCoordinates] =useState({});
  const [bounds,setBounds] =useState(null);
  const [childClicked,setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(()=>{
    setIsLoading(true);
    if (!("geolocation" in navigator)) {
      console.log("Geolocation is not available");
      setCoordinates(coordinatesByDefault);
      return
    }
    navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}}) => {
      setCoordinates({lat:latitude,lng:longitude});
    setIsLoading(false);

    },(err)=>{
      setCoordinates(coordinatesByDefault);
    setIsLoading(false);

    });
  },[]);

  useEffect(()=>{
    setIsLoading(true);
    if(bounds != null){
      getPlacesData(bounds).then((data:Array<IPlace>)=>{
        setPlaces(data)});
        setIsLoading(false);
    }
  },[coordinates,bounds]);


  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <List 
            places={places} 
            childClicked={childClicked} 
            isLoading={isLoading}
            />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map 
            setBounds={setBounds} 
            setCoordinates={setCoordinates} 
            coordinates={coordinates} 
            places={places}
            setChildClicked={setChildClicked}
            />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
