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
    { min: 0, max: 10, size: 450 },
    { min: 11, max: 15, size: 460 },
    { min: 16, max: 20, size: 470 },
    { min: 21, max: 25, size: 480 },
    { min: 26, max: 30, size: 490 },
    { min: 31, max: 40, size: 500 },
    { min: 41, max: 50, size: 510 },
    { min: 51, max: 60, size: 520 },
    { min: 61, max: 70, size: 530 },
    { min: 71, max: 80, size: 540 },
    { min: 81, max: 90, size: 550 },
    { min: 91, max: 100, size: 560 },
    { min: 101, max: 150, size: 570 },
    { min: 151, max: 200, size: 580 },
    { min: 201, max: 250, size: 590 },
    { min: 251, max: 300, size: 600 },
    { min: 301, max: 350, size: 610 },
    { min: 351, max: 400, size: 620 },
    { min: 401, max: 500, size: 630 },
    { min: 501, max: 600, size: 640 },
    { min: 601, max: 700, size: 650 },
    { min: 701, max: 800, size: 660 },
    { min: 801, max: 900, size: 670 },
    { min: 901, max: 1000, size: 680 },
    { min: 1001, max: 1250, size: 690 },
    { min: 1251, max: 1500, size: 700 },
    { min: 1501, max: 1750, size: 710 },
    { min: 1751, max: 2000, size: 720 }
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
