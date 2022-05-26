function calculateAtti(value){
    //console.log("value:",value);
    var valueArr = [countries, RawArr];
    //console.log(valueArr);
    var postiveCount = 0;
    var negativeCount = 0;
    var neutralCount = 0;

    for (var i = 0; i < countries.length; i++) {
         var keycountry = countries[i];
          if( value === keycountry){
              var att = valueArr[1][i];
              //console.log("att",att);
              if(att === "Positive"){
                  postiveCount++;
              }else if(att === "Negative"){
                  negativeCount++;
              }else if(att === "Neutral"){
                  neutralCount++;
              }
          }
      }
    var countryData = [postiveCount,neutralCount,negativeCount]

    calculateShowDataInCountry(countryData);
}
function calculateShowDataInCountry(countryData){
    myChart4.data.datasets[0].data = countryData;

    myChart4.update();
    console.log("myChart4",myChart4.data.datasets[0].data);
};//end of func
