import axios from 'axios';
import {IPlace} from '../interfaces/genericInterface';

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

  
export const getPlacesData = async (bounds:any): Promise<Array<IPlace> | any > => {
    try {
        console.log('execute api call');
        const options = buildOptions(bounds);
        const response=  await axios.get(URL, options);
        return  response?.data?.data;
    } catch (error) {
        console.log(error);
    }
}

const buildOptions = ({sw,ne}:any)=>{
    const options = {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY ||""
        }
      };
      return options;
}
