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
  const [weatherData,setWeatherData] =useState<Array<any>>([]);

  const [filteredPlaces,setFilteredPlaces] =useState<Array<IPlace>>([]);

  const [coordinates,setCoordinates] =useState({});
  const [bounds,setBounds] =useState(null);
  const [childClicked,setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type,setType] = useState('restaurants');
  const [rating,setRating] = useState('');


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
    const filteredPlaces = places?.filter(place=>place.rating>rating);
    setFilteredPlaces(filteredPlaces);
  },[places, rating]);

  useEffect(()=>{
    if(bounds !== null){
      setIsLoading(true);

      getPlacesData(type,bounds).then((data:Array<IPlace>)=>{
        setPlaces(data.filter((place:IPlace)=>place.name && Number(place.num_reviews)>0));
        setFilteredPlaces([])
        setIsLoading(false);
    });
  }
}
,[type,bounds]);


  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates}/>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <List 
            places={filteredPlaces.length ? filteredPlaces : places} 
            childClicked={Number(childClicked)} 
            isLoading={isLoading}
            type={type}
            rating={rating}
            setRating={setRating}
            setType={setType}
            />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map 
            setBounds={setBounds} 
            setCoordinates={setCoordinates} 
            coordinates={coordinates} 
            places={filteredPlaces.length ? filteredPlaces : places} 
            setChildClicked={setChildClicked}
            />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
