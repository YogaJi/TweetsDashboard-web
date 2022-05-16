
//line chart
const ctx = document.getElementById('linechart')
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: dateArr,
        datasets: [{
            label: 'tweets per day',
            data: tweetsPerDayArr,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    },
    options: {
        responsive:true,
        aspectRatio:4
    }
});

//pie chart
const ctx2 = document.getElementById('piechart')
const myChart2 = new Chart(ctx2, {
    type: 'doughnut',
    data: {
        labels: attitudeArr,
        datasets: [{
            label: 'tweets Sentiments Percentage Breakdown',
            data: analysisArr,
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)'
            ],
            hoverOffset: 4,
            tension: 0.1
        }]
    },
    options: {
        responsive:true,
        aspectRatio:4
    }
});
