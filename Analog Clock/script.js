let hourEl = document.getElementById('hour')
let minEL = document.getElementById('min')
let secEl = document.getElementById('sec')


 function displayTime(){

    let dates = new Date()

    let hh = dates.getHours()
    let mm = dates.getMinutes()
    let ss = dates.getSeconds()

    let hRotation = 30*hh + mm/2
    let mRotation = 6*mm
    let sRotation = 6*ss

    hourEl.style.transform = `rotate(${hRotation}deg)`
    minEL.style.transform = `rotate(${mRotation}deg)`
    secEl.style.transform = `rotate(${sRotation}deg)`
 } 



setInterval(displayTime,1000)