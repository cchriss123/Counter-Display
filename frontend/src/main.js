import './style.css';
import {EventsEmit, EventsOn} from '../wailsjs/runtime';


document.querySelector('#app').innerHTML = `
    <div class="outerContainer">
        <div class="desktop">
            <div class="displayDataContainer">
                <div class="topContainer">
                    <div class="result">
                        Waiting for data to display...
                    </div>
                </div>

                <div class="innerDisplayDataContainer"></div>
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
        mode = 'simple',
        zoneName = 'N/A',
        currentZoneGrafts = 'N/A',
        currentZoneTarget = 'N/A',
        totalSingles = 'N/A',
        totalDoubles = 'N/A',
        totalTriples = 'N/A',
        totalQuadruples = 'N/A',
        totalGrafts = 'N/A',
        totalHairPerFu = 'N/A',
    } = parsedData;

    const formattedHairPerFu = totalHairPerFu !== 'N/A'
        ? Number(totalHairPerFu).toFixed(2)
        : 'N/A';

    document.querySelectorAll('.innerDisplayDataContainer').forEach(resultElement => {
        resultElement.innerHTML = `

<div class="section">
    <div class="graftCountSection">
        <div class="countRow">
            <div class="countLabel">Singles</div>
            <div class="countValue">${totalSingles}</div>
        </div>

        <div class="countRow">
            <div class="countLabel">Doubles</div>
            <div class="countValue">${totalDoubles}</div>
        </div>

        <div class="countRow">
            <div class="countLabel">Triples</div>
            <div class="countValue">${totalTriples}</div>
        </div>

        <div class="countRow">
            <div class="countLabel">Quads</div>
            <div class="countValue">${totalQuadruples}</div>
        </div>
    </div>
     </div>
    

    <div class="section">
        <div class="mainStats">
            <div class="summaryRow">
                <div class="summaryLabel">Grafts</div>
                <div class="summaryValue">${totalGrafts}</div>
            </div>

            <div class="summaryRow">
                <div class="summaryLabel">Hair / FU</div>
                <div class="summaryValue">${formattedHairPerFu}</div>
            </div>
        </div>
    </div>

    ${mode === 'zoned' ? `
        <div class="section">
            <div class="zoneHeader">${zoneName}</div>

            <div class="zoneStats">
                <div class="summaryRow">
                    <div class="summaryLabel">Zone Grafts</div>
                    <div class="summaryValue">${currentZoneGrafts}</div>
                </div>

                <div class="summaryRow">
                    <div class="summaryLabel">Target</div>
                    <div class="summaryValue">${currentZoneTarget}</div>
                </div>
            </div>
        </div>
    ` : ''}

    <div class="spacer"></div>
`;
    });

    // updateZoneInfo();

    function updateTimer() {
        document.querySelector('.topContainer').innerHTML = `
            <div class="innerTopLeft">Duration: ${formatTime(timer)}</div>
            <div class="innerTopRight">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
    `;
    }

    function formatTime(seconds) {
        const hrs = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'f' || event.key === 'F') {
        event.preventDefault();
        EventsEmit('toggle-fullscreen');
    }
});


