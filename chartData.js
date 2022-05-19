
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
        title: {
            display: true,
            text: 'tweets Sentiments Percentage Breakdown',
            fontColor: "#f00",
        },
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
            },
            datalabels:{
                color: 'white',
                labels: {
                  // title: {
                  //   font: {
                  //     weight: 'bold'
                  //   }
                  // },
                  // value: {
                  //   color: 'green'
                  // }
                }
            }//datalabels
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

//google geo chart
google.charts.load('current', {
        'packages':['geochart'],
      });
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable(googleGeoData);
    var Goptions = {
        height: 400,
        enableRegionInteractivity: true,
        colorAxis: {colors: ['#FFCAC2', '#FF6A88','#D0002D']},
        region: 'world',
        legend:{
            textStyle: {
                color: 'grey',
                fontSize: 16
            }
        }

    };

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
    chart.draw(data, Goptions);

    google.visualization.events.addListener(chart, 'select', function () {
       var selection = chart.getSelection();
       if(selection.length === 0){
           //console.log("selection",selection);
           calculateShowDataInCountry([0,0,0]);
       }else{
           var value = data.getValue(selection[0].row, 0);
           calculateAtti(value);
       }

    });
}

//line chart
const ctx4 = document.getElementById('geo-linechart')
const myChart4 = new Chart(ctx4, {
    type: 'bar',
    data: {
        labels: ["Positive","Neutral","Negative"],
        datasets: [{
            label: 'tweets Sentiments',
            //data: countryData,
            data: 0,
            fill: false,
            backgroundColor: [
                'rgb(255, 205, 86, 0.4)',
                'rgb(54, 162, 235, 0.4)',
                'rgb(255, 99, 132, 0.4)',

            ],
            borderColor: [
                'rgb(255, 205, 86)',
                'rgb(54, 162, 235)',
                'rgb(255, 99, 132)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        animation:{
            easing: 'easeOutQuart'
        },
        scales:{
            x: {
               grid: {
                 color: '#f2f2f2',
                 tickColor: '#f2f2f2'
               }
           },
           y: {
              grid: {
                color: 'white'
              }
          },
        },
        responsive:true,
        indexAxis: 'y',
        plugins: {
            legend: {
                display: true,
                position:'bottom',
                align:'end',
            },
            labels:{
                render:'value',
                fontStyle: 'border',
                fontColor: '#707070',
                position:'outside',

            }
        }
    },
    //plugins:[ChartDataLabels]

});
