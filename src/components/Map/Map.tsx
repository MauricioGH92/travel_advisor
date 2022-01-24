import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from '@material-ui/lab/Rating';
import GoogleMapReact from 'google-map-react';
import React from 'react';
import { IPlace } from '../../interfaces/genericInterface';
import useStyles from './styles';


const urlDemoImage = "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg";
const Map = ({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setChildClicked
}:{setCoordinates:any,setBounds:any,coordinates:any,places:Array<IPlace>,setChildClicked:Function}) => {
  const classes = useStyles();
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact 
          bootstrapURLKeys={{key:process.env.REACT_APP_MAPS_KEY||""}}
          center ={coordinates}
          defaultZoom = {14}
          margin={[50,50,50,50]}
          onChange={(e)=>{
            setCoordinates(e.center);setBounds(e.marginBounds)
          }}
          onChildClick= {(child)=>setChildClicked(child)}
        >
          {places?.map((place,i)=>(
            <CardComponent
              
              key={i} 
              lat={Number(place.latitude)} 
              lng={Number(place.longitude)}
              place={place}>
                
              </CardComponent>
          ))}

      </GoogleMapReact>
    </div>
  );
};

export const  CardComponent = ({lat,lng,place}:any)=>{
  const isDesktop = useMediaQuery('(min-width:600px)');
  const classes = useStyles();

  return <div className={classes.markerContainer}>{
    !isDesktop?(
      <LocationOnOutlinedIcon color='primary' fontSize='large' />
    ):
    <Paper elevation={3} className={classes.paper}>
      <Typography variant='subtitle2' gutterBottom >{place.name}</Typography>
      <img
        className={classes.pointer}
        src={place.photo ? place.photo.images.large.url : urlDemoImage}
        alt={place.name}/>
        <Rating size='small' value={Number(place.rating)} readOnly />
    </Paper>
  }</div>
};

export default Map;
