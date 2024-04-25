async function fetchData() {
    const apiUrl = 'https://data.cityofnewyork.us/resource/5t4n-d72c.json';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function filterData(area) {
    const data = await fetchData();
    const filteredData = data.filter(item => {
        return item.area.toLowerCase().includes(area.toLowerCase());
    });
    console.log("Filtered data:", filteredData);
    displayData(filteredData);
    showImage(area);
}

function showImage(area) {
    const images = document.querySelectorAll('.introduction img');
    images.forEach(img => {
        const imageArea = img.id.replace('image', '');
        if (imageArea.toLowerCase() === area.replace(' ', '').toLowerCase()) {
            img.style.display = 'block';
        } else {
            img.style.display = 'none';
        }
    });
}


function displayData(data) {
    const chart = document.getElementById('chart');
    chart.innerHTML = '';

    data.sort((a, b) => parseInt(a.year) - parseInt(b.year));

    const years = [...new Set(data.map(item => item.year))];
    const colors = ['#B22222', '#FF8C00', '#32CD32', '#FF00FF'];

    const yearColorMap = {};
    years.forEach((year, index) => {
        yearColorMap[year] = colors[index % colors.length];
    });

    const ranges = [


User
this is my JS:

async function fetchData() {
    const apiUrl = 'https://data.cityofnewyork.us/resource/5t4n-d72c.json';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function filterData(area) {
    const data = await fetchData();
    const filteredData = data.filter(item => {
        return item.area.toLowerCase().includes(area.toLowerCase());
    });
    console.log("Filtered data:", filteredData);
    displayData(filteredData);
    showImage(area);
}

function showImage(area) {
    const images = document.querySelectorAll('.introduction img');
    images.forEach(img => {
        const imageArea = img.id.replace('image', '');
        if (imageArea.toLowerCase() === area.replace(' ', '').toLowerCase()) {
            img.style.display = 'block';
        } else {
            img.style.display = 'none';
        }
    });
}


function displayData(data) {
    const chart = document.getElementById('chart');
    chart.innerHTML = '';

    data.sort((a, b) => parseInt(a.year) - parseInt(b.year));

    const years = [...new Set(data.map(item => item.year))];
    const colors = ['#B22222', '#FF8C00', '#32CD32', '#FF00FF'];

    const yearColorMap = {};
    years.forEach((year, index) => {
        yearColorMap[year] = colors[index % colors.length];
    });

    const ranges = [
        { min: 0, max: 10, size: 150 },
        { min: 11, max: 15, size: 160 },
        { min: 16, max: 20, size: 170 },
        { min: 21, max: 25, size: 180 },
        { min: 26, max: 30, size: 190 },
        { min: 31, max: 40, size: 200 },
        { min: 41, max: 50, size: 210 },
        { min: 51, max: 60, size: 220 },
        { min: 61, max: 70, size: 230 },
        { min: 71, max: 80, size: 240 },
        { min: 81, max: 90, size: 250 },
        { min: 91, max: 100, size: 260 },
        { min: 101, max: 150, size: 270 },
        { min: 151, max: 200, size: 280 },
        { min: 201, max: 250, size: 290 },
        { min: 251, max: 300, size: 300 },
        { min: 301, max: 350, size: 310 },
        { min: 351, max: 400, size: 320 },
        { min: 401, max: 500, size: 330 },
        { min: 501, max: 600, size: 340 },
        { min: 601, max: 700, size: 350 },
        { min: 701, max: 800, size: 360 },
        { min: 801, max: 900, size: 370 },
        { min: 901, max: 1000, size: 380 },
        { min: 1001, max: 1250, size: 390 },
        { min: 1251, max: 1500, size: 400 },
        { min: 1501, max: 1750, size: 410 },
        { min: 1751, max: 2000, size: 420 }
    ];    

    const totalEstimates = {};

    data.forEach((item, index) => {
        const barContainer = document.createElement('div');
        const bar = document.createElement('div');
        const labelEstimate = document.createElement('span');
        const labelYear = document.createElement('span');

        barContainer.classList.add('bar-container');
        bar.classList.add('bar', 'bar-animate');
        labelEstimate.classList.add('label-estimate');
        labelYear.classList.add('label-year');

        const yearColor = yearColorMap[item.year];

        bar.style.backgroundColor = yearColor;

        const range = ranges.find(range => item.homeless_estimates >= range.min && item.homeless_estimates <= range.max);
        bar.style.height = `0px`; // Set initial height to 0

        labelEstimate.textContent = item.homeless_estimates;
        labelYear.textContent = item.year;

        barContainer.appendChild(bar);
        barContainer.appendChild(labelEstimate);
        barContainer.appendChild(labelYear);
        chart.appendChild(barContainer);

        const barWidthPercentage = 0.7;
        const barWidth = (chart.offsetWidth / data.length) * barWidthPercentage;
        const barMargin = -6;
        const barOffset = index * (barWidth + barMargin);

        barContainer.style.width = barWidth + 'px';
        barContainer.style.left = barOffset + 'px';

        bar.style.width = '100%';

        totalEstimates[item.area] = (totalEstimates[item.area] || 0) + parseInt(item.homeless_estimates);
    });

    const totalContainer = document.createElement('div');
    totalContainer.classList.add('total-container');

    for (const area in totalEstimates) {
        const totalElement = document.createElement('div');
        totalElement.textContent = `TOTAL: ${totalEstimates[area]}`;
        totalContainer.appendChild(totalElement);
    }

    chart.appendChild(totalContainer);  

    data.forEach(async (item, index) => {
        await new Promise(resolve => setTimeout(resolve, 300 * index));

        const barContainer = chart.children[index];
        const bar = barContainer.children[0];
        const range = ranges.find(range => item.homeless_estimates >= range.min && item.homeless_estimates <= range.max);

        bar.style.height = `${range.size}px`;
    });
}


filterData('Manhattan');

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.getElementById('filterButtons').children;
    for (let i = 0; i < filterButtons.length; i++) {
        filterButtons[i].addEventListener('click', function() {
            for (let j = 0; j < filterButtons.length; j++) {
                filterButtons[j].classList.remove('clicked');
            }
            this.classList.add('clicked');
            const area = this.textContent.trim();
            filterData(area);
        });
    }
});

There is an error Failed to load resource: the server responded with a status of 404 ()
for Manhattan data
ChatGPT
The error message "Failed to load resource: the server responded with a status of 404" typically indicates that the resource you are trying to access (in this case, the data for Manhattan) could not be found on the server. This could happen due to various reasons:

Incorrect URL: Double-check the URL you are using to fetch the data. Ensure that it is correct and that it points to the correct resource on the server.
Server Issue: There might be an issue with the server hosting the data. The resource you are trying to access might be temporarily unavailable or has been moved.
Data Availability: Make sure that the data for Manhattan exists in the dataset you are trying to access. If the dataset does not include Manhattan data, you will receive a 404 error when attempting to fetch it.
To troubleshoot this issue, you can:

Manually visit the URL in a web browser to see if the data is accessible.
Check the documentation or contact the provider of the data to ensure that Manhattan data is available and to verify the correct URL.
Verify if there are any restrictions or access controls on the data that might be preventing you from accessing it.
Once you have confirmed that the data is available and that the URL is correct, you can update your code accordingly. If the issue persists, it may be necessary to investigate further or seek assistance from the data provider or server administrator.

User
It's this one that is not working:
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.getElementById('filterButtons').children;
    for (let i = 0; i < filterButtons.length; i++) {
        filterButtons[i].addEventListener('click', function() {
            for (let j = 0; j < filterButtons.length; j++) {
                filterButtons[j].classList.remove('clicked');
            }
            this.classList.add('clicked');
            const area = this.textContent.trim();
            filterData(area);
        });
    }
});
ChatGPT
It seems like the issue is with the event listener attached to the filter buttons. Let's break down the code to see if we can identify the problem:

javascript
Copy code
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.getElementById('filterButtons').children;
    for (let i = 0; i < filterButtons.length; i++) {
        filterButtons[i].addEventListener('click', function() {
            for (let j = 0; j < filterButtons.length; j++) {
                filterButtons[j].classList.remove('clicked');
            }
            this.classList.add('clicked');
            const area = this.textContent.trim();
            filterData(area);
        });
    }
});
This code attaches a click event listener to each filter button. When a button is clicked, it removes the 'clicked' class from all buttons, adds the 'clicked' class to the clicked button, retrieves the text content of the clicked button (which presumably represents an area), and then calls the filterData function with that area.

Here are some potential reasons why this code might not be working as expected:

Incorrect Selector: The code assumes that there is an element with the ID 'filterButtons', and it selects its children. If there is no such element, or if it doesn't contain the expected filter buttons, this code will not work.
Event Delegation: Depending on when the filter buttons are created or added to the DOM, the event listener might not be attached to them properly. Using event delegation can solve this problem by attaching the event listener to a parent element that exists when the page loads.
Button Content: Ensure that the text content of the filter buttons matches the areas you expect to filter. If there are any discrepancies, it could lead to unexpected behavior.
To debug the issue:

Verify that there is an element with the ID 'filterButtons' and that it contains the filter buttons.
Check if the event listener is attached correctly, especially if the filter buttons are dynamically generated.
Verify that the text content of the filter buttons corresponds to the areas you want to filter.
If you're still encountering issues, providing more context or details about the HTML structure and how the filter buttons are created or populated would be helpful for further assistance.

User
My @media is reflecting at all:

body {
    margin: 0%;
}

@font-face {
    font-family: 'marker';
    src: url(fonts/Marker-Regular.otf);
}

@font-face {
    font-family: 'marker2';
    src: url(fonts/YRDZST\ Medium.ttf);
  }
  
footer{
    width: 100%;
    height: 50px;
    background-color: black;
    color: rgb(255, 255, 255);
    font-family: Arial, Helvetica, sans-serif;
    font-style: normal;
    font-size: 0.8vw;
    text-align: center;
    align-content: center;
}

.background {
    position: relative;
    background-image: url(img/BG.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 2000px;
}

.container{
    position: relative;
    width: 100%;
    height: 100vh;
}

.title{
    position: absolute;
    top: 6%;
    left: -1%;
    background-image: url(img/square.png);
    background-size: contain;
    background-repeat: no-repeat;
    height: 50%;
    width: 32%;
    transform: rotate(-12deg);
    filter: drop-shadow(5px 10px 7px rgba(26, 12, 2, 0.708));
    animation-name: slideRight;
    animation-duration: 1s;
    transition: ease 0.5s;
}

@keyframes slideRight {
    from {transform: translateX(-200px) rotate(10deg);}
    to {transform: translateX(0px) rotate(-12deg);}
}

.introduction{
    position: absolute;
    top: 8%;
    margin: 9%;
    transform: rotate(-3deg);
    transition: ease 0.5s;
}

.introduction > img {
    width: 40%;
    height: auto;
    display: none;
    position: relative;
    left: -4%;
    transform: rotate(4deg);
    filter: drop-shadow(3px 3px 8px rgba(26, 12, 2, 0.708));
    animation-name: slideRight2;
    animation-duration: 1.5s;
    transition: ease 0.5s;
}

@keyframes slideRight2 {
    from {transform: translateX(-300px) rotate(20deg);}
    to {transform: translateX(0px) rotate(4deg);}
}

#chart {
    position: absolute;
    width: 45%;
    max-width: 75%;
    top: 80%;
    left: 40%;
    transform: rotate(-3deg);
    mix-blend-mode: multiply;
}

.bar-container {
    position: absolute;
    bottom: 0;
    transform-origin: bottom;
}

.bar {
    position: relative;
    transition: height 2s;
    clip-path: polygon(10% 0%, 9% 15%, 8% 23%, 11% 36%, 11% 48%, 11% 68%, 12% 95%, 12% 100%, 97% 99%, 96% 77%, 94% 62%, 96% 45%, 93% 25%, 91% 1%);
}

.bar-animate {
    transition: height 1s ease;
}


.label-estimate {
    position: absolute;
    font-family: Arial, sans-serif;
    font-weight: bold;
    font-size: 3vw;
    top: 40px;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    text-align: center;
}

.label-year {
    position: absolute;
    font-family: Arial, sans-serif;
    font-weight: regular;
    font-size: 1vw;
    bottom: 2px;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    text-align: center;
}

.total-container {
    position: absolute;
    font-family: 'marker2';
    font-size: 4vw;
    letter-spacing: -3.5px;
    top: 10px;
    left: 5%;
    transform: rotate(-5deg);
}

.controls {
    position: absolute;
    right: 3%;
    top: 25%;
    background-image: url(img/square2.png);
    background-size: contain;
    background-repeat: no-repeat;
    height: 100%;
    width: 25%;
    transform: rotate(5deg);
    filter: drop-shadow(5px 10px 7px rgba(26, 12, 2, 0.708));
    animation-name: slideLeft;
    animation-duration: 1.5s;
}

@keyframes slideLeft {
    from {transform: translateY(-50px) translateX(350px) rotate(10deg);}
    to {transform: translateX(0px) rotate(5deg);}
    
}

#filterButtons{
    position: absolute;
    display: flex;
    flex-direction: column;
    transform: rotate(7deg);
    top: 80px;
    right: 9%;
    margin: 0%;
    mix-blend-mode: multiply;
}

button{
    font-family: 'marker';
    font-size: 4vw;
    letter-spacing: -2px;
    border: none;
    background: none;
    mix-blend-mode: multiply;
}

button:hover{
    cursor: pointer;
    scale: 110%;
    background-image: url(img/circle.png);
    background-size: contain;
    background-position: 50%;
    background-repeat: no-repeat;
}

button:focus{
    cursor: pointer;
    scale: 110%;
    background-image: url(img/circle.png);
    background-size: contain;
    background-position: 50%;
    background-repeat: no-repeat;
}

.clicked {
    cursor: pointer;
    scale: 110%;
    background-image: url(img/circle.png);
    background-size: contain;
    background-position: 50%;
    background-repeat: no-repeat;
}

.container2{
    position: absolute;
    top: 45%;
    margin: 15%;
    display: flex;
    flex-direction: row;
}

.help2{
    margin-top: -2%;
    margin-right: 3%;
    margin-left: 3%;
}

#brc{
    width: 90%;
    height: auto;
    margin-left: 10%;
    margin-bottom: -13%;
    filter: drop-shadow(5px 10px 7px rgba(26, 12, 2, 0.708));
}

#brc:hover {
    scale: 110%;
}

#cares{
    width: 80%;
    height: auto;
    margin-left: 15%;
    margin-bottom: -10%;
    filter: drop-shadow(5px 10px 7px rgba(26, 12, 2, 0.708));
}

#cares:hover {
    scale: 110%;
}

#nyc{
    width: 80%;
    height: auto;
    margin-left: 10%;
    margin-bottom: -15%;
    filter: drop-shadow(5px 10px 7px rgba(26, 12, 2, 0.708));
}

#nyc:hover {
    scale: 110%;
}


h1{
    background-image: url(img/Underline.png);
    background-size: 60%;
    background-repeat: no-repeat;
    background-position: 70%;
    position: absolute;
    line-height: 70%;
    top: -2%;
    font-family: 'marker';
    font-size: 6vw;
    max-width: 100%;
    text-align: center;
    mix-blend-mode: multiply;
}

h2{
    line-height: 90%;
    font-family: 'marker';
    font-size: 2.5vw;
    max-width: 100%;
    text-align: center;
    mix-blend-mode: multiply;
}

h3{
    font-family: 'marker2';
    font-size: 1.5vw;
    max-width: 100%;
    mix-blend-mode: multiply;
    margin-left: 120%;
    margin-top: 15%;
}

p{
    line-height: 90%;
    letter-spacing: -1px;
    font-family: 'marker';
    font-size: 1.8vw;
    width: 32%;
    mix-blend-mode: multiply;
    z-index: 4;

}

h4{
    line-height: 95%;
    letter-spacing: -1px;
    font-family: 'marker';
    font-size: 1.8vw;
    text-align: center;
    mix-blend-mode: multiply;
}

@media (max-width: 900px) {
    .background {
        position: relative;
        background-image: url(img/BG2.jpg);
        background-size: cover;
        background-repeat: no-repeat;
        width: 100%;
        height: 2750px;
    }

    footer{
        height: 30px;
        font-size: 2vw;
    }
    

    .title{
        top: 5%;
        width: 75%;
        left: -1%;
    }

    .introduction{
        position: absolute;
        top: 20%;
        margin: 8%;
        transform: rotate(-3deg);
    }
    
    .introduction > img {
        width: 85%;
        left: -50px;
    }

    #chart {
        position: absolute;
        width: 75%;
        bottom: -25%;
        left: 8%;
        transform: rotate(-3deg);
        mix-blend-mode: multiply;
    }
    
    .label-estimate {
        font-size: 5vw;
    }
    
    .label-year {
        font-size: 3vw;
    }

    .total-container {
        position: absolute;
        font-family: 'marker2';
        font-size: 12vw;
        letter-spacing: -3.5px;
        top: 105%;
        left: 5%;
        transform: rotate(-5deg);
    }
    
    
    .controls {
        position: absolute;
        right: 3%;
        top: 75%;
        background-image: url(img/square2.png);
        background-size: contain;
        background-repeat: no-repeat;
        height: 100%;
        width: 50%;
        transform: rotate(5deg);
        filter: drop-shadow(5px 10px 7px rgba(26, 12, 2, 0.708));
        animation-name: slideLeft;
        animation-duration: 1.5s;
    }

    #filterButtons{
        position: absolute;
        display: flex;
        flex-direction: column;
        transform: rotate(7deg);
        top: 40px;
        right: 12%;
        margin: 0%;
        mix-blend-mode: multiply;
    }
    
    button{
        font-family: 'marker';
        font-size: 8vw;
        letter-spacing: -2px;
        border: none;
        background: none;
        mix-blend-mode: multiply;
    }

    .container2{
        position: absolute;
        top: 56%;
        left: 14%;
        margin: 2%;
        display: flex;
        flex-direction: column;
        vertical-align: middle;
    }

    .help2{
        margin-top: 0%;
        margin-right: 0%;
        margin-left: 0%;
    }
    
    #brc{
        width: 40%;
        height: auto;
        margin-left: 20%;
        margin-bottom: -13%;
        filter: drop-shadow(5px 10px 7px rgba(26, 12, 2, 0.708));
    }
    
    #cares{
        width: 50%;
        height: auto;
        margin-bottom: -10%;
        filter: drop-shadow(5px 10px 7px rgba(26, 12, 2, 0.708));
    }
    
    #nyc{
        width: 40%;
        height: auto;
        margin-left: 20%;
        margin-bottom: -10%;
        filter: drop-shadow(5px 10px 7px rgba(26, 12, 2, 0.708));
    }

    h1{
        font-size: 14vw;
    }

    h2{
        line-height: 90%;
        font-family: 'marker';
        font-size: 7vw;
        width: 80%;
    }
    
    h3{
        font-family: 'marker2';
        font-size: 6vw;
        max-width: 100%;
        mix-blend-mode: multiply;
        margin-left: 120%;
        margin-top: 15%;
    }
    
    p{
        line-height: 90%;
        letter-spacing: -1px;
        font-family: 'marker';
        font-size: 4.8vw;
        width: 70%;
        mix-blend-mode: multiply;
        z-index: 4;
    
    }
    
    h4{
        font-family: 'marker';
        font-size: 4.5vw;
        width: 80%;
        margin-top: -5%;
    }
}
ChatGPT
It seems like your @media queries are designed to adjust the styling of elements based on the width of the viewport, making your website responsive. However, you mentioned that the styles within the @media queries are not reflecting.

Here are a few potential reasons why the styles may not be applying as expected:

Viewport Width: Ensure that the viewport width matches the conditions specified in your @media queries. For example, if you're testing on a screen wider than 900px, the styles within the @media (max-width: 900px) query won't apply.
Specificity: Check if there are other styles in your CSS that are overriding the styles within the @media queries. Styles with higher specificity or that are defined later in the CSS file will take precedence.
Caching: Sometimes, changes in CSS files might not reflect immediately due to browser caching. Try clearing your browser cache or using a private browsing window to ensure you're seeing the most recent version of your CSS.
Syntax Errors: Make sure there are no syntax errors within your @media queries or elsewhere in your CSS file. Even a small syntax error can prevent styles from being applied correctly.
Compatibility: Check if the CSS properties or values used within the @media queries are supported across different browsers. Some properties may not work as expected in older browsers or certain versions.
If none of these reasons seem to be the cause, try isolating the issue by simplifying your @media queries and testing each one individually to see if they apply the expected styles. This can help identify if there's a specific query that's causing the problem. Additionally, using browser developer tools to inspect the elements and their styles can provide more insight into why certain styles aren't being applied.

User
Edit this such that the size range starts from 300 instead of 150:

    const ranges = [
        { min: 0, max: 10, size: 150 },
        { min: 11, max: 15, size: 160 },
        { min: 16, max: 20, size: 170 },
        { min: 21, max: 25, size: 180 },
        { min: 26, max: 30, size: 190 },
        { min: 31, max: 40, size: 200 },
        { min: 41, max: 50, size: 210 },
        { min: 51, max: 60, size: 220 },
        { min: 61, max: 70, size: 230 },
        { min: 71, max: 80, size: 240 },
        { min: 81, max: 90, size: 250 },
        { min: 91, max: 100, size: 260 },
        { min: 101, max: 150, size: 270 },
        { min: 151, max: 200, size: 280 },
        { min: 201, max: 250, size: 290 },
        { min: 251, max: 300, size: 300 },
        { min: 301, max: 350, size: 310 },
        { min: 351, max: 400, size: 320 },
        { min: 401, max: 500, size: 330 },
        { min: 501, max: 600, size: 340 },
        { min: 601, max: 700, size: 350 },
        { min: 701, max: 800, size: 360 },
        { min: 801, max: 900, size: 370 },
        { min: 901, max: 1000, size: 380 },
        { min: 1001, max: 1250, size: 390 },
        { min: 1251, max: 1500, size: 400 },
        { min: 1501, max: 1750, size: 410 },
        { min: 1751, max: 2000, size: 420 }
    ];    

    const totalEstimates = {};

    data.forEach((item, index) => {
        const barContainer = document.createElement('div');
        const bar = document.createElement('div');
        const labelEstimate = document.createElement('span');
        const labelYear = document.createElement('span');

        barContainer.classList.add('bar-container');
        bar.classList.add('bar', 'bar-animate');
        labelEstimate.classList.add('label-estimate');
        labelYear.classList.add('label-year');

        const yearColor = yearColorMap[item.year];

        bar.style.backgroundColor = yearColor;

        const range = ranges.find(range => item.homeless_estimates >= range.min && item.homeless_estimates <= range.max);
        bar.style.height = `0px`;

        labelEstimate.textContent = item.homeless_estimates;
        labelYear.textContent = item.year;

        barContainer.appendChild(bar);
        barContainer.appendChild(labelEstimate);
        barContainer.appendChild(labelYear);
        chart.appendChild(barContainer);

        const barWidthPercentage = 0.7;
        const barWidth = (chart.offsetWidth / data.length) * barWidthPercentage;
        const barMargin = -6;
        const barOffset = index * (barWidth + barMargin);

        barContainer.style.width = barWidth + 'px';
        barContainer.style.left = barOffset + 'px';

        bar.style.width = '100%';

        totalEstimates[item.area] = (totalEstimates[item.area] || 0) + parseInt(item.homeless_estimates);
    });

    const totalContainer = document.createElement('div');
    totalContainer.classList.add('total-container');

    for (const area in totalEstimates) {
        const totalElement = document.createElement('div');
        totalElement.textContent = `TOTAL: ${totalEstimates[area]}`;
        totalContainer.appendChild(totalElement);
    }

    chart.appendChild(totalContainer);  

    data.forEach(async (item, index) => {
        await new Promise(resolve => setTimeout(resolve, 300 * index));

        const barContainer = chart.children[index];
        const bar = barContainer.children[0];
        const range = ranges.find(range => item.homeless_estimates >= range.min && item.homeless_estimates <= range.max);

        bar.style.height = `${range.size}px`;
    });
}


filterData('Manhattan');

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.getElementById('filterButtons').children;
    for (let i = 0; i < filterButtons.length; i++) {
        filterButtons[i].addEventListener('click', function() {
            for (let j = 0; j < filterButtons.length; j++) {
                filterButtons[j].classList.remove('clicked');
            }
            this.classList.add('clicked');
            const area = this.textContent.trim();
            filterData(area);
        });
    }
});
