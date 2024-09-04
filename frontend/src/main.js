import './style.css';
import {EventsEmit, EventsOn} from '../wailsjs/runtime';


document.querySelector('#app').innerHTML = `
    <div class="outerContainer">
        <div class="topContainer">
            <div class="result">Waiting for data to display...</div>
        </div>
        <div class="desktop">
            <div class="leftContainer">
                <div class="zoneCountContainer">

                    <div class="input"></div>
                </div>
                <div class="zoneInfoContainer"></div>
            </div>
            <div class="overallInfoContainer"></div>
        </div>
        
        <div class="mobile">
            <div class="zoneCountContainer">
                <div class="input"></div>
            </div>
            <div class="container">
                <div class="zoneInfoContainer"></div>
                <div class="overallInfoContainer"></div>
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


    document.querySelectorAll('.zoneCountContainer').forEach(resultElement => {
        resultElement.innerHTML = `

            <div class="innerZoneCountContainerWide">
                    <div class="activeZone">${activeName}</div>
            </div>

            <div class="innerZoneCountContainer">
            
                <div class="zoneKey">Singles</div>
                <div class="zoneValue">${singles}</div>
            </div>
            <div class="innerZoneCountContainer">
                <div class="zoneKey">Doubles</div>
                <div class="zoneValue">${doubles}</div>
            </div>
            <div class="innerZoneCountContainer">
                <div class="zoneKey">Triples</div>
                <div class="zoneValue">${triples}</div>       
            </div>
            <div class="innerZoneCountContainer">
                <div class="zoneKey">Quads</div>
                <div class="zoneValue">${quadruples}</div>  
            </div>
        `;
    });

    updateZoneInfo();
    window.addEventListener('resize', updateZoneInfo);

    function updateZoneInfo() {
        document.querySelectorAll('.zoneInfoContainer').forEach(resultElement => {
            const isWideScreen = window.innerWidth > 1300;
            resultElement.innerHTML = isWideScreen
                ?
                `
                <div class="white"><strong>Zone Info</strong></div>
                <div class="white"></div>
                <div></div>
                <div><br></div>
                <div class="blueLeft">Grafts count: </div>
                <div class="blueRight">${grafts}</div>
                <div class="white">Hairs count:</div>
                <div class="white">${hairs}</div>
                <div class="white">Hair per graft:</div>
                <div class="white">${hairPerCountedGraft.toFixed(2)}</div>
                <div class="blueLeft">Area:</div>
                <div class="blueRight">${area}</div>  
                <div class="blueLeft">Target: </div>
                <div class="blueRight">${graftsExtractedToReachDonorDesiredCoverageValue}</div>
                <div class="white">Left: </div>
                <div class="white">${graftsLeftToReachDonorDesiredCoverageValue}</div>
         
                `
                :
                `<div class="white"><strong>Zone Info</strong></div>
                <div class="white" ></div>
                <div class="blueLeft" ><strong>Grafts count: </strong></div>
                <div class="blueRight"><strong>${grafts}</strong></div>
                <div class="white">Hairs count:</div>
                <div class="white">${hairs}</div>
                <div class="blueLeft">Hair per graft:</div>
                <div class="blueRight">${hairPerCountedGraft.toFixed(2)}</div>
                <div class="white">Area:</div>
                <div class="white">${area}</div>
                <div class="blueLeft"><br></div>
                <div class="blueRight"></div>       
                <div class="white">Target: </div>
                <div class="white">${graftsExtractedToReachDonorDesiredCoverageValue}</div>
                <div class="blueLeft">Left: </div>
                <div class="blueRight">${graftsLeftToReachDonorDesiredCoverageValue}</div>
                <br>
            `;
        });
    }

    document.querySelectorAll('.overallInfoContainer').forEach(resultElement => {
        resultElement.innerHTML = `
            <div class="white"><strong>Overall Info</strong></div>
            <div class="white"></div>
            
            <div class="blueLeft"><strong>Total grafts: </strong></div>
            <div class="blueRight"><strong>${totalGrafts}</strong></div>
            <div class="white">Total hair: </div>
            <div class="white">${totalHair}</div>
            <div class="blueLeft">Hair per graft: </div>
            <div class="blueRight">${totalHairPerGraftsCounted.toFixed(2)}</div>
            
            
           

            <div class="white"><br></div>
            <div class="white"></div>
            
            <div class="blueLeft">Total singles: </div>
            <div class="blueRight">${totalSingles}</div>
            <div class="white">Total doubles: </div>
            <div class="white">${totalDoubles}</div>
            <div class="blueLeft">Total triples: </div>
            <div class="blueRight">${totalTriples}</div>
            <div class="white">Total quads: </div>
            <div class="white">${totalQuadruples}</div>
           


        `;
    });

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


