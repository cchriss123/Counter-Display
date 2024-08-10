import './style.css';
import { EventsOn } from '../wailsjs/runtime';

// Initial HTML setup
document.querySelector('#app').innerHTML = `
    <div class="outerContainer">
        <div class="desktop">
            <div class="leftContainer">
                <div class="containerRed">
                    <div class="result">Waiting for data to display...</div>
                    <div class="input"></div>
                </div>
                <div class="containerBlue"></div>
            </div>
            <div class="containerGreen"></div>
        </div>
        
        <div class="mobile">
            <div class="containerRed">
                <div class="result">Waiting for data to display...</div>
                <div class="input"></div>
            </div>
            <div class="container">
                <div class="containerBlue"></div>
                <div class="containerGreen"></div>
            </div>
        </div>
    </div>
`;

// Listen for data from the backend
EventsOn("dataFromBackend", function(data) {
    let parsedData = JSON.parse(data);
    let name = parsedData.name;
    let formattedData = JSON.stringify(parsedData, null, 4);

    // Update all result elements inside containerRed
    document.querySelectorAll('.containerRed .result').forEach(resultElement => {
        resultElement.innerHTML = `
            <div>
                <p>Hello ${name}!</p>
                <pre>${formattedData}</pre>
            </div>
        `;
    });

    // Update all input elements inside containerRed
    // document.querySelectorAll('.containerRed .input').forEach(inputElement => {
    //     inputElement.innerHTML = `
    //         <div>Additional input or data can be placed here.</div>
    //     `;
    // });

    console.log(parsedData);
});
