import './style.css';
import { EventsOn } from '../wailsjs/runtime';

document.querySelector('#app').innerHTML = `
    <div class="outerContainer">
        <div class="topContainer"></div>
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
          <div class="marginDiv"></div>
      
    </div>
`;



EventsOn("dataFromBackend", function(data) {
    let parsedData = JSON.parse(data);

    // Destructure donorZone and overall data
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

    document.querySelector('.topContainer').innerHTML = `
        <div class="innerTop">${name}</div> 
        <div class="innerTop">${name}</div> 
        <div class="innerTop">${name}</div> 
    `;



    document.querySelectorAll('.containerRed').forEach(resultElement => {
        resultElement.innerHTML = `
            <div class="innerRed">
                    <div class="zoneCount">Singles: ${singles}</div>
                    <div class="zoneCount">Doubles: ${doubles}</div>
                    <div class="zoneCount">Triples: ${triples}</div>
                    <div class="zoneCount">Quadruples: ${quadruples}</div>
            </div>
        `;
    });

    document.querySelectorAll('.containerBlue').forEach(resultElement => {
        resultElement.innerHTML = `
            <div>
                <div><strong>Zone Info</strong></div>
                <div>Grafts count: ${grafts}</div>
                <div>Hairs count: ${hairs}</div>
                <div>Hair per graft: ${hairPerCountedGraft}</div>
                <div>Area: ${area} cm²</div>
                <div>Target: ${graftsExtractedToReachDonorDesiredCoverageValue}</div>
                <div>Left: ${graftsLeftToReachDonorDesiredCoverageValue}</div>
            </div>
        `;
    });

    document.querySelectorAll('.containerGreen').forEach(resultElement => {
        resultElement.innerHTML = `
            <div>
                <div><strong>Overall Info</strong></div>
                <div>Total Singles: ${totalSingles}</div>
                <div>Total Doubles: ${totalDoubles}</div>
                <div>Total Triples: ${totalTriples}</div>
                <div>Total Quads: ${totalQuadruples}</div>
                <br>
                <div>Total Grafts: ${totalGrafts}</div>
                <div>Total Hair: ${totalHair}</div>
                <div>Total Hair per Graft: ${totalHairPerGraftsCounted.toFixed(2)}</div>
            </div>
        `;
    });

    console.log(parsedData);
});