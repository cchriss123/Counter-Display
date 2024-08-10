import './style.css';

import logo from './assets/images/logo.png';
import { EventsOn } from '../wailsjs/runtime';

document.querySelector('#app').innerHTML = `
    <img id="logo" class="logo">
    <div class="result" id="result">Waiting for data to display...</div>
    <div class="result" id="input">
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
