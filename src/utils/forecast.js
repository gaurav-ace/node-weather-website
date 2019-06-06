const request = require('request')
const chalk = require('chalk')
const forecast = (a , b, callback)=> {

  const url = 'https://api.darksky.net/forecast/9da3ed50390f45cf3b2d19bedda9b9ec/' + a + ',' + b + '?units=si&lang=en'
  request({url, json: true},(error,{body})=> {
      if(error)
      {
        callback('unable to connect to weather services!!',undefined)
      }
      else if(body.error)
      {
        callback('not a valid coordinate! Try another..',undefined)
      }
      else {
        callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is ' + body.currently.precipProbability + ' % chance of rain. The wind speed is ' + body.daily.data[0].windSpeed + 'km/hr')
      }
  })
}

module.exports = forecast
