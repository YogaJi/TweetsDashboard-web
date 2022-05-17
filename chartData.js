
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
            tension: 0.1,
            hoverOffset: 10
        }]
    },
    options: {
        responsive:true,
        aspectRatio:6,
        maintainAspectRatio:false,
        layout:{
            padding: 10
        },
        plugins: {
            legend: {
                display: true,
                position:'chartArea',
                align:'start',
            },
            labels:{
                render: 'Percentage',
                fontStyle: 'border',
                fontColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)'
                ],
                position:'outside',
                textMargin: 6,
            }
        }
    },
    plugins:[ChartDataLabels]
});

//muti line chart
const ctx3 = document.getElementById('multlinechart')
const mixedChart = new Chart(ctx3, {
    data: {
        datasets: [{
            type: 'line',
            label: 'postive',
            data: postiveCountArrData,

            borderColor: 'rgb(255, 205, 86)'
        }, {
            type: 'line',
            label: 'negative',
            data: neutralCountArrData,

            borderColor: 'rgb(255, 99, 132)'
        }, {
            type: 'line',
            label: 'nutural',
            data: negativeCountArrData,
            borderColor: 'rgb(54, 162, 235)'
        }],
        labels: dateArr
    }
});
