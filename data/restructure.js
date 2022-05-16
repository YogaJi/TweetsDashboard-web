var rawDateArr = [];
var dateArr = [];
var tweetsPerDayArr = [];
var geo_nameArr = [];

var analysisArr = [];
var attitudeArr = [];

var textArr = [];
var geoLocationArr = [];

$.ajax({
            url: "./data/tweetdata.json",//json文件位置，文件名
            type: "GET",//请求方式为get
            async: false,
            dataType: "json", //返回数据格式为json
            success: function(data) {//请求成功完成后要执行的方法
               //给info赋值给定义好的变量
               var obj = data;

               for(let key in obj){

                   if(key === "date"){
                       var leg = Object.keys(obj[key]).length;
                       for(i = 0; i< leg; i++){
                           var dates = getDates(obj[key][i]);
                           rawDateArr.push(dates)
                       }
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

                         var arr1 = Object.keys(countTweets).sort();
                         for(i = 0; i< arr1.length; i++){
                             dateArr.push(arr1[i])
                         }
                         console.log(dateArr);
                         var arr2 = Object.values(countTweets);
                         for(i = 0; i< arr2.length; i++){
                             tweetsPerDayArr[i] = arr2[i]
                         }

                   }else if(key == "geo_name"){
                           geo_nameArr.push(obj[key]);
                   }else if(key === "analysis"){
                       var leg = Object.keys(obj[key]).length;
                       var RawArr = [];
                       for(i = 0; i< leg; i++){
                           RawArr.push(obj[key][i])
                       }

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

                         var arr1 = Object.keys(countT).sort();
                         for(i = 0; i< arr1.length; i++){
                             attitudeArr.push(arr1[i])
                         }
                         //console.log("att:",attitudeArr);

                         var arr2 = Object.values(countT);
                         for(i = 0; i< arr2.length; i++){
                             analysisArr[i] = arr2[i]
                         }
                        //console.log("analysisArr:",analysisArr);
                        
                   }else if(key == "text"){
                           textArr.push(obj[key]);
                   }else if(key == "geo_geo_bbox"){
                           geoLocationArr.push(obj[key]);
                   }
               }

            }
        })

console.log("tweetsPerDayArr:",tweetsPerDayArr);
console.log("dateArr:",dateArr);

//get dates format: 05-11
function  getDates(timestamp) {
         var  date =  new  Date(timestamp);
         Y = date.getFullYear() +  '-' ;
         M = (date.getMonth()+1 < 10 ?  '0' +(date.getMonth()+1) : date.getMonth()+1) +  '-' ;

         D =(date.getDate()+1 < 10 ?  '0' +(date.getDate()+1) : date.getDate());
         return  M+D;
     }
//get full dates format: 2022-05-11
 function  getFullDate(timestamp) {
          var  date =  new  Date(timestamp);
          Y = date.getFullYear() +  '-' ;
          M = (date.getMonth()+1 < 10 ?  '0' +(date.getMonth()+1) : date.getMonth()+1) +  '-' ;
          D = date.getDate();
          // h = date.getHours() +  ':' ;
          // m = date.getMinutes() +  ':' ;
          // s = date.getSeconds();
          return  Y+M+D;
      }
