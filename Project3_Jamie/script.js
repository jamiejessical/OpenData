function setup() {
    var canvasWidth;
    if (windowWidth <= 900) {
        canvasHeight = 2750;
    } else {
        canvasHeight = 2000;
    }
    var canvas = createCanvas(displayWidth, canvasHeight);
    canvas.parent('p5-sketch'); 
}


let brushSize = 10;
let f = 0.5;
let spring = 0.4;
let friction = 0.45;
let v = 0.5;
let r = 0;
let vx = 0;
let vy = 0;
let splitNum = 100;
let diff = 2;
function draw() {
  if (mouseIsPressed) {
    if (!f) {
      f = true;
      x = mouseX;
      y = mouseY;
    }
    vx += (mouseX - x) * spring;
    vy += (mouseY - y) * spring;
    vx *= friction;
    vy *= friction;

    v += sqrt(vx * vx + vy * vy) - v;
    v *= 0.55;

    oldR = r;
    r = brushSize - v;
    var num = random(0.1, 1);
    for (let i = 0; i < splitNum; ++i) {
      oldX = x;
      oldY = y;
      x += vx / splitNum;
      y += vy / splitNum;
      oldR += (r - oldR) / splitNum;
      if (oldR < 1) {
        oldR = 1;
      }
      strokeWeight(oldR + diff);
      line(
        x + random(0, 2),
        y + random(0, 2),
        oldX + random(0, 2),
        oldY + random(0, 2)
      );
      strokeWeight(oldR);
      line(
        x + diff * random(0.1, 2),
        y + diff * random(0.1, 2),
        oldX + diff * random(0.1, 2),
        oldY + diff * random(0.1, 2)
      );
      line(
        x - diff * random(0.1, 2),
        y - diff * random(0.1, 2),
        oldX - diff * random(0.1, 2),
        oldY - diff * random(0.1, 2)
      );
    }
  } else if (f) {
    vx = vy = 0;
    f = false;
  }
}


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
        bar.style.height = `0px`;

        labelEstimate.textContent = item.homeless_estimates;
        labelYear.textContent = item.year;

        barContainer.appendChild(bar);
        barContainer.appendChild(labelEstimate);
        barContainer.appendChild(labelYear);
        chart.appendChild(barContainer);

        const barWidthPercentage = 0.6;
        const barWidth = (chart.offsetWidth / data.length) * barWidthPercentage;
        const barMargin = 2;
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

