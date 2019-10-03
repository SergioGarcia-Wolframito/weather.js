import  request  from 'request';
import { ENETUNREACH } from 'constants';
import yargs from 'yargs';

const mapURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const nextURL = '.json?access_token=';
const maptoken = 'pk.eyJ1Ijoic2dhcmNpYWExIiwiYSI6ImNrMWFvMTgyeTAyeXkzbm13YTlvNXdzcnkifQ.YfZzszV503-Awklxt9tKBQ';

const baseURL = 'https://api.darksky.net/';
const token = '2580f18fb8b90ca1fd141eb67af9f52a/';
const endpoint = baseURL + "forecast/" +token;


const locate = function(argv){
    const ciudad = {
      name: argv.name,
      index: argv.index,
    };

    

    const mapPlace = JSON.stringify(ciudad.name);
    const mapBoxURL = mapURL + mapPlace + nextURL + maptoken;

    


    request({url : mapBoxURL, json:true}, (error,response)=>{

        if(ciudad.index!=null){

        console.log();    
        console.log(response.body.features[ciudad.index].place_name);

        const lat = response.body.features[ciudad.index].geometry.coordinates[1];
        const long = response.body.features[ciudad.index].geometry.coordinates[0];

        const darkSkyURL = endpoint + lat + "," + long;

        console.log();
        
        request({url : darkSkyURL, json:true}, (error,response)=>{
             console.log(response.body.currently.temperature);
         });

        }else{

        const arr = response.body.features;
        arr.forEach((elem,index) =>{
                console.log(index +" " + elem.place_name)
        });

        }
    });
}


yargs.command({
    command: 'locate',
    describe: 'take coordinates of a city',
    builder: {
      name: {
        describe: 'Name of the city',
        demandOption: true,
        type: 'string',
      },
      index: {
        describe: 'Index of the city',
        demandOption: false,
        type: 'number',
      },
    },
    handler: locate,
  });

yargs.parse();





