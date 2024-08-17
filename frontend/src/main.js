import './style.css';
import { EventsOn } from '../wailsjs/runtime';

document.querySelector('#app').innerHTML = `
    <div class="outerContainer">
        <div class="topContainer">
            <div class="result">Waiting for data to display...</div>
        </div>
        <div class="desktop">
            <div class="leftContainer">
                <div class="containerRed">
                
                    <div class="input"></div>
                </div>
                <div class="containerBlue"></div>
            </div>
            <div class="containerGreen"></div>
        </div>
        
        <div class="mobile">
            <div class="containerRed">
                <div class="input"></div>
            </div>
            <div class="container">
                <div class="containerBlue"></div>
                <div class="containerGreen"></div>
            </div>
        </div>
      
    </div>
`;

let hasStarter = false;
let timer = 0;
let activeName = "";

EventsOn("dataFromBackend", function(data) {
    let parsedData = JSON.parse(data);

    if (hasStarter === false) {
        hasStarter = true;

        setInterval(() => {
            timer++;
            updateTimer(parsedData);
        }, 1000);
    }
    console.log(parsedData)

    const {
        donorZone: {
            name = 'Unknown',
            singles = 'N/A',
            doubles = 'N/A',
            triples = 'N/A',
            quadruples = 'N/A',
            grafts = 'N/A',
            hairs = 'N/A',
            hairPerCountedGraft = 'N/A',
            area = 'N/A',
            graftsExtractedToReachDonorDesiredCoverageValue = 'N/A',
            graftsLeftToReachDonorDesiredCoverageValue = 'N/A'
        } = {},
        totalSingles = 'N/A',
        totalDoubles = 'N/A',
        totalTriples = 'N/A',
        totalQuadruples = 'N/A',
        totalGrafts = 'N/A',
        totalHair = 'N/A',
        totalHairPerGraftsCounted = 'N/A'
    } = parsedData;

    activeName = name;
    updateTimer();

    document.querySelectorAll('.containerRed').forEach(resultElement => {
        resultElement.innerHTML = `
            <div class="innerRed">
                <div class="zoneKey">Singles</div>
                <div class="zoneValue">${singles}</div>
            </div>
            <div class="innerRed">
                <div class="zoneKey">Doubles</div>
                <div class="zoneValue">${doubles}</div>
            </div>
            <div class="innerRed">
                <div class="zoneKey">Triples</div>
                <div class="zoneValue">${triples}</div>       
            </div>
            <div class="innerRed">
                <div class="zoneKey">Quads</div>
                <div class="zoneValue">${quadruples}</div>  
            </div>
        `;
    });

    document.querySelectorAll('.containerBlue').forEach(resultElement => {
        resultElement.innerHTML = `
            <div><strong>Zone Info</strong></div>
            <div></div>
            <div>Grafts count: </div>
            <div>${grafts}</div>
            <div>Hairs count:</div>
            <div>${hairs}</div>
            <div>Hair per graft:</div>
            <div>${hairPerCountedGraft.toFixed(2)}</div>
            <div>Area:</div>
            <div>${area}</div>
            <br>
            <div></div>
    
            <div>Target: </div>
            <div>${graftsExtractedToReachDonorDesiredCoverageValue}</div>
            <div>Left: </div>
            <div>${graftsLeftToReachDonorDesiredCoverageValue}</div>
            <br>
        `;
    });

    document.querySelectorAll('.containerGreen').forEach(resultElement => {
        resultElement.innerHTML = `
            <div><strong>Overall Info</strong></div>
            <div></div>
            <div>Total Singles: </div>
            <div>${totalSingles}</div>
            <div>Total Doubles: </div>
            <div>${totalDoubles}</div>
            <div>Total Triples: </div>
            <div>${totalTriples}</div>
            <div>Total Quads: </div>
            <div>${totalQuadruples}</div>
            <br>
            <div></div>
            <div>Total Grafts: </div>
            <div>${totalGrafts}</div>
            <div>Total Hair: </div>
            <div>${totalHair}</div>
            <div>Total Hair per Graft: </div>
            <div>${totalHairPerGraftsCounted.toFixed(2)}</div>

        `;
    });


    function updateTimer(parsedData) {
        document.querySelector('.topContainer').innerHTML = `
            <div class="innerTop">${activeName}</div> 
            <div class="innerTop">${formatTime(timer)}</div> 
            <div class="innerTop">${new Date().toLocaleTimeString()}</div> 
    `;
    }

    function formatTime(seconds) {
        const hrs = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

});