



    const weatherdata = document.querySelector('form')  //gives javascript format of element data

    const search = document.querySelector('input')

    const msg1 = document.querySelector('#msg1')
    const msg2 = document.querySelector('#msg2')



    weatherdata.addEventListener('submit',(e)=>{
      e.preventDefault()
      const loc = search.value
      msg1.textContent = 'loading data...'
      msg2.textContent  = ''

      fetch('/weather?address='+ loc ).then((response)=>{
         response.json().then((data)=>{
          if(data.error)
          {
             msg1.textContent = data.error
          }
          else {
            msg1.textContent = data.location
            msg2.textContent  = data.forecast
          }

        })
      })
    //  const location = search.value;
    //  console.log(location)

    })
