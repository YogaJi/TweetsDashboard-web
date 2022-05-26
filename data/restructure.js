//count all the dates
var rawDateArr = [];
//count all the attitude
var RawArr = [];
//country raw value
var countries = []
var dateArr = [];
var tweetsPerDayArr = [];

var geo_countryArr = [];
var geo_countryCountArr = [];
var googleGeoData = []

var analysisArr = [];
var attitudeArr = [];

var textArr = [];
var geoLocationArr = [];

var sumLike =[];
var sumReply = 0;

var langArr = [];
var langList = [];
var langCountEach = [];

$.ajax({
            url: "./data/tweet_processed.json",
            type: "GET",
            async: false,
            dataType: "json",
            success: function(data) {
               var obj = data;

               for(let key in obj){
                   console.log(key);

                   if(key === "created_at"){
                       var arr = []
                       var leg = Object.keys(obj[key]).length;
                       for(i = 0; i< leg; i++){
                           //console.log(obj[key][i].slice(5,10));
                           var dates = obj[key][i].slice(5,10);
                           arr.push(dates)
                       }

                       for (var i = 0; i < arr.length; i++) {
                           rawDateArr.unshift(arr[i]);          
                       }
                        //console.log("rawDateArr:",rawDateArr);
                       // date = obj[i]["created_at"].slice(5,10);
                       // rawDateArr.push(date);

                       var countTweets = [];
                       for (var i = 0; i < rawDateArr.length; i++) {
                             var v = rawDateArr[i];
                             var counts = countTweets[v];
                             if (counts) {
                                 countTweets[v] += 1;
                             } else {
                                 countTweets[v] = 1;
                             }
                         }
                         //console.log(countTweets);
                         dateArr = Object.keys(countTweets);
                         tweetsPerDayArr = Object.values(countTweets);

                         // var arr1 = Object.keys(countTweets).sort();
                         // for(i = 0; i< arr1.length; i++){
                         //     dateArr.push(arr1[i])
                         // }
                         // //console.log("dateArr:",dateArr);
                         // var arr2 = Object.values(countTweets);
                         // for(i = 0; i< arr2.length; i++){
                         //     tweetsPerDayArr[i] = arr2[i]
                         // }

                   }else if(key == "geo.country_code"){
                       //console.log("have geo country code");
                       var leg = Object.keys(obj[key]).length;
                       for(i = 0; i< leg; i++){
                           var c = obj[key][i];
                           countries.push(c)
                       }
                        //console.log("countries",countries);
                        //console.log(":countries.length",countries.length);

                        var countCountry = [];
                        for (var i = 0; i < countries.length; i++) {

                              if(countries[i] !== null){
                                  var v = countries[i];
                                  var counts = countCountry[v];
                                  if (counts) {
                                      countCountry[v] += 1;
                                  } else {
                                      countCountry[v] = 1;
                                  }
                              }

                          }
                          //console.log("countCountry",countCountry);

                           var ar = Object.keys(countCountry);
                           var ar2 = Object.values(countCountry);

                           for(i = 0; i< ar.length; i++){
                               googleGeoData[i] = [ar[i],ar2[i]];
                           }

                            googleGeoData.unshift(['Country', 'Tweets']);
                            console.log("googleGeoData",googleGeoData);


                   }else if(key === "analysis"){
                       var leg = Object.keys(obj[key]).length;

                       for(i = 0; i< leg; i++){
                           RawArr.push(obj[key][i])
                       }
                       //console.log("RawArr",RawArr);

                       var countT = [];
                       for (var i = 0; i < RawArr.length; i++) {
                             var v = RawArr[i];
                             var counts = countT[v];
                             if (counts) {
                                 countT[v] += 1;
                             } else {
                                 countT[v] = 1;
                             }
                         }
                         attitudeArr = Object.keys(countT);
                         analysisArr = Object.values(countT);

                        //  var arr1 = Object.keys(countT).sort();
                        //  for(i = 0; i< arr1.length; i++){
                        //      attitudeArr.push(arr1[i])
                        //  }
                        //console.log("att:",attitudeArr);
                        //
                        //  var arr2 = Object.values(countT);
                        //  for(i = 0; i< arr2.length; i++){
                        //      analysisArr[i] = arr2[i]
                        //  }
                        //console.log("analysisArr:",analysisArr);

                   }else if(key == "text"){
                           //textArr.push(obj[key]);
                   }else if(key == "geo_geo_bbox"){
                           //geoLocationArr.push(obj[key]);

                   }else if(key == "public_metrics.like_count"){
                       var leg = Object.keys(obj[key]).length;
                       for(i = 0; i< leg; i++){
                           var c = obj[key][i];
                           sumLike.push(c)
                       }
                           //var c = obj[i]["public_metrics.like_count"];
                           //sumLike.push(c);

                   }else if(key == "public_metrics.reply_count"){
                       var leg = Object.keys(obj[key]).length;
                       for(i = 0; i< leg; i++){
                           var c = obj[key][i];
                           sumReply += parseInt(c);
                       }
                           //var c = obj[i]["public_metrics.reply_count"];
                           //sumReply +=  parseInt(c);

                   }else if(key == "lang"){
                       var leg = Object.keys(obj[key]).length;
                       for(i = 0; i< leg; i++){
                           var c = obj[key][i];
                           langArr.push(c);
                       }
                           //var c = obj[i]["lang"];
                           //langArr.push(c);
                   }
               }

            }
        })


// //get dates format: 05-11
// function  getDates(timestamp) {
//          var  date =  new  Date(timestamp);
//          Y = date.getFullYear() +  '-' ;
//          M = (date.getMonth()+1 < 10 ?  '0' +(date.getMonth()+1) : date.getMonth()+1) +  '-' ;
//
//          D =(date.getDate() < 10 ?  '0' +(date.getDate()) : date.getDate());
//          return  M+D;
//      }
// //get full dates format: 2022-05-11
//  function  getFullDate(timestamp) {
//           var  date =  new  Date(timestamp);
//           Y = date.getFullYear() +  '-' ;
//           M = (date.getMonth()+1 < 10 ?  '0' +(date.getMonth()+1) : date.getMonth()+1) +  '-' ;
//           D = date.getDate();
//           // h = date.getHours() +  ':' ;
//           // m = date.getMinutes() +  ':' ;
//           // s = date.getSeconds();
//           return  Y+M+D;
// }

//get mult-line data structure
var dateAndAttArr = []

function combineDatesAndAttitude(a,b){
    var c = a.map((e,i)=>{
        return [e,b[i]]
    })
    return c
}

dateAndAttArr = combineDatesAndAttitude(rawDateArr,RawArr)
//console.log("dateAndAttArr:",dateAndAttArr);

//combine geo country with tweets count

var postiveCount = 0;
var neutralCount = 0;
var negativeCount = 0;
var postiveCountArr = [];
var neutralCountArr = [];
var negativeCountArr = [];

var postiveCountArrData = [];
var neutralCountArrData = [];
var negativeCountArrData = [];

for(y = 0; y< dateArr.length; y++){
    for(i = 0; i< dateAndAttArr.length; i++){

        if(dateAndAttArr[i][0] == dateArr[y]){

            if(dateAndAttArr[i][1] === "Positive"){
                postiveCount ++;
                postiveCountArr[dateArr[y]] = postiveCount;

            }else if(dateAndAttArr[i][1] == "Neutral"){
                neutralCount ++;
                neutralCountArr[dateArr[y]] = neutralCount;
            }else if(dateAndAttArr[i][1] == "Negative"){
                negativeCount ++;
                negativeCountArr[dateArr[y]] = negativeCount;
            }
        }
    }
    postiveCount = 0;
    neutralCount = 0;
    negativeCount = 0;
}
//console.log("postiveCountArr:",postiveCountArr);

function getAttitudeData(a){
    var arr = Object.values(a);
    var attributeData = []
    for(i = 0; i< arr.length; i++){
        attributeData[i] = arr[i]
    }
    return attributeData
}
postiveCountArrData =  getAttitudeData(postiveCountArr);
neutralCountArrData = getAttitudeData(neutralCountArr);
negativeCountArrData = getAttitudeData(negativeCountArr);
// console.log(postiveCountArrData);
// console.log(neutralCountArrData);
// console.log(negativeCountArrData);

//calculate like and lang data
calculateLang();

//calculate middle public public_metrics like counts
function calculatePublicMetricsLikeCountMiddle(arr){
    arr.sort()
    if(arr.length%2===0){
        return ((arr[arr.length/2]+arr[arr.length/2-1])/2);
    }else{
        return arr[parseInt(arr.length/2)];
    }
}

var middle = calculatePublicMetricsLikeCountMiddle(sumLike);
//console.log(middle);

//calculate average public metrics like counts
function averageLike(arr){
    var avg=0;
    var sum=0;
    for(var i=0;i<arr.length;i++){
        sum+=arr[i];
    }
    avg = sum/arr.length;
    return avg
}
var avg = parseInt(averageLike(sumLike));
//console.log(avg);

//calculate language
function calculateLang(){
    var countLang = [];
    for (var i = 0; i < langArr.length; i++) {
          var v = langArr[i];
          var counts = countLang[v];
          if (counts) {
              countLang[v] += 1;
          } else {
              countLang[v] = 1;
          }
      }
      console.log(countLang);
      langList = Object.keys(countLang);
      langCountEach = Object.values(countLang);

}
