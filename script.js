// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://laundry.ust.hk/ldr/app/tickets/id/reserve-machine?id=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ust.hk
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(()=>{k()}, 750)

    function k() {
        const elements = document.querySelector("#root > div > div.main-section > div > div > div:nth-child(2) > div.sixteen.wide.computer.sixteen.wide.tablet.column > div > div > div > div:nth-child(2) > div:nth-child(1) ").children

        for (var i = 0; i < elements.length; i++) {
            var target = elements[i].querySelector('div > div:nth-child(2) > small:nth-child(3)')


            if (document.querySelector("#root > div > div.main-section > div > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > p").innerHTML.includes('Dryer')) {
                let regex = /(\d{1,2}) min\(s\) .*at (.*)\)/
                let m = target.innerHTML.match(regex)

                if (m != null) {
                    let min = parseInt(m[1])
                    let datetime = m[2]

                    let now = new Date()
                    let obj = new Date(datetime)

                    obj.setMinutes(obj.getMinutes() + min);

                    let intime = ((obj-now)/60000).toFixed(2)

                    let fmrt = intime+' mins | '+min+' min | '+datetime+' | '+(obj.getHours()<10?'0'+obj.getHours():obj.getHours())+':'+(obj.getMinutes()<10?'0'+obj.getMinutes():obj.getMinutes())

                    if (intime < -1560) {target.innerHTML="ERROR";target.style.color='red'}
                    else if (intime < 5) {target.innerHTML=fmrt;target.style.color='#60c421'}
                    else {target.innerHTML=fmrt}
                }
           }
            else {
                    let regex = /at (.*)\)/
                    let m = target.innerHTML.match(regex)

                    if (m != null) {
                        let datetime = m[1]

                        let now = new Date()
                        let obj = new Date(datetime)

                        obj.setMinutes(obj.getMinutes() + 35);

                        let intime = ((obj-now)/60000).toFixed(2)

                        let fmrt = intime+' mins | '+datetime+' | '+(obj.getHours()<10?'0'+obj.getHours():obj.getHours())+':'+(obj.getMinutes()<10?'0'+obj.getMinutes():obj.getMinutes())
                        target.innerHTML=datetime
                        if (intime < -1560) {target.innerHTML="ERROR";target.style.color='red'}
                        else if (intime < 5) {target.innerHTML=fmrt;target.style.color='#60c421'}
                        else {target.innerHTML=fmrt}
          }}
        }
    }
})();