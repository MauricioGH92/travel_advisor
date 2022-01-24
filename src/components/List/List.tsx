import { CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import React, { createRef, useEffect, useState } from 'react';
import { IPlace } from '../../interfaces/genericInterface';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './styles';


interface IListProps {
  places:Array<IPlace>,
  childClicked:Number,
  isLoading:Boolean,
  type:string,
  rating:string,
  setRating:Function,
  setType:Function
}

const List = ({places,childClicked,isLoading,type,rating,setRating,setType}:IListProps) => {
  const classes = useStyles();
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    
    const refs:any = Array(places?.length).fill(null).map((_,i) => elRefs[i] || createRef());
    
    setElRefs(refs);
  }, [places]);
  
  return (<div className={classes.container}>

            <Typography variant="h4" >Restaurants, Hotels & Attractionsarround you</Typography>
            {
              isLoading ? 
                (<div className={classes.container}>
                  <CircularProgress size="5rem" />
                </div>):
                (<>
                    <FormControl className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                <Select value={type} onChange={(e:any)=>setType(e.target.value)}>
                  <MenuItem value="restaurants">Restaurants</MenuItem>
                  <MenuItem value="hotels">Hotels</MenuItem>
                  <MenuItem value="attractions">Attractions</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel>Rating</InputLabel>
                <Select value={rating} onChange={(e:any)=>setRating(e.target.value)}>
                  <MenuItem value={0}>All</MenuItem>
                  <MenuItem value={3}>Above 3.0</MenuItem>
                  <MenuItem value={4}>Above 4.0</MenuItem>
                  <MenuItem value={4.5}>Above 4.5</MenuItem>
                </Select>
              </FormControl>
              <Grid container spacing={3} className={classes.list}>
                {places?.map((place:IPlace,i:any)=>(
                  <Grid ref={elRefs[i]} item key={i} xs={12}>
                    <PlaceDetails 
                    place={place} 
                    selected={childClicked === i} 
                    refProp={elRefs[i]}/>
                  </Grid>
                ))}
              </Grid>
              </>
                )
            }
            
          </div>)
};

export default List;
