import React,{createRef,useEffect,useState} from 'react';
import { CircularProgress, Grid, Typography,InputLabel,MenuItem,FormControl,Select } from "@material-ui/core";
import PlaceDetails from '../PlaceDetails/PlaceDetails';

import useStyles from './styles';
import { IPlace } from '../../interfaces/genericInterface';

const List = ({places,childClicked,isLoading}:{places:Array<IPlace>,childClicked:any,isLoading:Boolean}) => {
  const classes = useStyles();
  const [type,setType] = useState('restaurants');
  const [rating,setRating] = useState('');
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
                    selected={Number(childClicked) === i} 
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
