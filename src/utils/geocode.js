const request = require('request')

const geocode = (address,callback) => {
   const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZ2F1cmF2LWFjZSIsImEiOiJjandnYzljOGYxZmg4M3pwbHd5dmZ4dWViIn0.wgFt9SQZYaa7-gxdM35loA&limit=1'


  request({url,json: true},(error,{body})=>{
    if(error)
    {
      callback('unable to connect to server!!!',undefined)
    }
    else if( body.features.length === 0){
      callback('loaction not found!! try another search..',undefined)
    }
    else {
      callback(undefined,{
        latitude : body.features[0].center[1],
        longitude : body.features[0].center[0],
        place : body.features[0].place_name
      })
    }
  })
}

module.exports = geocode
