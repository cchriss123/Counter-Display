import './style.css';

import logo from './assets/images/logo.png';
import { EventsOn } from '../wailsjs/runtime';

document.querySelector('#app').innerHTML = `

<div class="outerContainer">

    <div class="desktop">
        <div class="leftContainer">
            <div class="containerRed"></div>
            <div class="containerBlue"></div>
        </div>
        <div class="containerGreen"></div>
    </div>
    

    <div class="mobile">
        <div class="containerRed"></div>
        <div class="container">
            <div class="containerBlue"></div>
            <div class="containerGreen"></div>
        </div>
    </div>
    
    
</div>
`;
document.getElementById('logo').src = logo;

let resultElement = document.getElementById("result");

// Listen for data from the backend
EventsOn("dataFromBackend", function(data) {
    let parsedData = JSON.parse(data);
    let name = parsedData.name;


    let formattedData = JSON.stringify(parsedData, null, 4);


    resultElement.innerHTML = `
        <div>
            <p>Hello ${name}!</p>
            <pre>
                    ${formattedData}
            </pre>
        </div>`;
    console.log(parsedData);
});
