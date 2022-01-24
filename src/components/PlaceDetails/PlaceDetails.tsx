import React from 'react';
import { IPlace } from '../../interfaces/genericInterface';
import { Box, Typography, Grid, Paper, Button, Card, CardMedia,CardContent,CardActions,Chip } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnIcon from '@material-ui/icons/LocationOnOutlined';
import  Rating from '@material-ui/lab/Rating';

import useStyles from './styles'
import { ArrowUpward } from '@material-ui/icons';

const PlaceDetails = ({place,selected,refProp}:{place:IPlace,selected:any,refProp:any}) => {
  const classes = useStyles();
  if(selected) refProp?.current?.scrollIntoView({behavior: 'smooth', block: 'start'});

  const urlDemoImage = "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg";
  return (
  <Card elevation = {6}>
   <CardMedia style= {{height:350}} image={place?.photo?.images?.original?.url||urlDemoImage} title={place.name}/>
    <CardContent>
      <Typography variant="h5" component="h2">{place.name}</Typography>
      <Box display="flex" justifyContent="space-between">
        <Rating size='small' value={Number(place.rating)} readOnly />
        <Typography gutterBottom variant="subtitle1">out of {place.num_reviews}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1">Price</Typography>
        <Typography gutterBottom variant="subtitle1">{place.price}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1">Ranking</Typography>
        <Typography variant="subtitle1">{place.ranking}</Typography>
      </Box>
      {place?.awards?.map((award,i)=>(
        <Box key={i} my={1} display="flex" justifyContent="space-between" alignItems="center">
          <img src={award.images.small} alt={award.display_name}/>
          <Typography variant='subtitle2' color='textSecondary'>{award.display_name}</Typography>
        </Box>
      ))}
      {place?.cuisine?.map(({name},i)=>(
        <Chip key={i} size="small" label={name} className={classes.chip}/>
      ))}
      {
        place?.address && (
        <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
          <LocationOnIcon />{place.address}
        </Typography>)
      }
      {
        place?.phone && (
        <Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.subtitle}>
          <PhoneIcon />{place.phone}
        </Typography>)
      }
      <CardActions>
        <Button size='small' color='primary' onClick={()=>window.open(place.web_url,'_blank')}>
          Trip advisor
        </Button>
        <Button size='small' color='primary' onClick={()=>window.open(place.website,'_blank')}>
          website
        </Button>
      </CardActions>
    </CardContent>
  </Card>);
};

export default PlaceDetails;
