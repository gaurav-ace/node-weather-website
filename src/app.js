  const path = require('path')  //it is a core module so no need to install it,just call it
  const hbs = require('hbs')
  //const request = require('request')
 const express = require('express')
  const geocode = require('./utils/geocode')
  const forecast = require('./utils/forecast')
  ///console.log(__dirname)
  //console.log(__filename)
//  console.log(path.join(__dirname+ '../../public'))
 const app = express()    //creating an instance of the express package..
 const port = process.env.PORT || 3000

  const publicpath = path.join(__dirname ,'../public')
  const partialpath = path.join(__dirname,'../templates/partials')
  const viewspath = path.join(__dirname,'../templates/views')



 app.set('view engine','hbs')
 app.set('views',viewspath)
 hbs.registerPartials(partialpath)



 app.use(express.static(publicpath))


  app.get('/',(req,res)=>{
    res.render('index',{
      title: 'weather app',
      name : 'gaurav'
    })
  })


  app.get('/about',(req,res)=>{
    res.render('about',{
      title: 'About the app',
      name : 'gaurav'
    })
  })



  app.get('/help',(req,res)=>{
    res.render('help',{
      title: 'We are here to help ',
      name : 'gaurav'
    })
  })



  app.get('/help/*',(req,res)=>{
    res.render('404',{
      title: '404',
      name : 'gaurav',
      errormsg: 'help article not found!'
    })
  })



 app.get('/weather',(req,res)=> {
   if(!req.query.address)
   {
     return res.send({
       error:  'you must enter an address!!'
     })
   }
   geocode(req.query.address,(error,{latitude,longitude,place} = {})=>{

        if(error)
        {
          return  res.send({error})
        }

        // console.log('longitude ',longitude)
        // console.log('latitude',latitude)

        forecast(latitude,longitude, (error, forecastdata) => {
           if(error)
           {
               return  res.send({error})
           }
           res.send({
             location: place,
             latitude: latitude,
             longitude: longitude,
             forecast: forecastdata
           })
          // console.log(place)
          // console.log(chalk.green(forecastdata))
    })
   })

 })
 app.get('*',(req,res)=>{
   res.render('404',{
     title: '404',
     name : 'gaurav',
     errormsg: 'page not found!'
   })
 })
 app.listen(port,()=>{
   console.log('server is up on port' + port)
 })
