// document.getElementById("countTws").innerHTML= rawDateArr.length;
// document.getElementById("avgLike").innerHTML= avg;
// document.getElementById("sumReply").innerHTML= sumReply;
document.getElementById("fromDate").innerHTML= dateArr[0];
document.getElementById("toDate").innerHTML= dateArr[dateArr.length-1];

function rollStaticData(previousNum,goalNum,fresh,step){
    var value = document.getElementById(previousNum);
    //var fresh = 5;
    var preValue = value.innerHTML;
    var preNum = parseInt(preValue);
    function Roll(){

        if( preNum < goalNum ){
            preNum += step;
            value.innerHTML = preNum;
        }else if(preNum = goalNum){
            value.innerHTML = goalNum;
            }
    }
    var MyMar=setInterval(Roll,fresh);
 }

rollStaticData("countTws",rawDateArr.length,5,298);
rollStaticData("avgLike",avg,50,21);
rollStaticData("sumReply",sumReply,1,1490);
