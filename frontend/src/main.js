import './style.css';
import './app.css';

import logo from './assets/images/logo-universal.png';
import { EventsOn } from '../wailsjs/runtime';

document.querySelector('#app').innerHTML = `
    <img id="logo" class="logo">
    <div class="result" id="result">Waiting for data to display...</div>
    <div class="input-box" id="input">
    </div>
`;
document.getElementById('logo').src = logo;

let resultElement = document.getElementById("result");


EventsOn("dataFromBackend", function(data) {
    resultElement.innerText = `Received data: ${data}`;
    console.log(data)
});
