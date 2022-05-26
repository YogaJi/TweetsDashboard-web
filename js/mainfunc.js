function calculateAtti(value){
    //console.log("value：",value);
    var countrycode = [
        ["AT","AUSTRIA"],
        ["AU","AUSTRALIA"],
        ["AZ","AZERBAIJAN"],
        ["BD","BANGLADESH"]
        ["BE","BELGIUM"],
        ["BH","BAHRAIN"],
        ["BJ","BENIN"],
        ["BR", "BRAZIL"],
        ["CA", "CANADA"],
        ["CL", "CHILE"],
        ["CZ", "CZECH REPUBLIC"],
        ["DE", "GERMANY"],
        ["DK", "DENMARK"],
        ["EE", "ESTONIA"],
        ["EG", "EGYPT"],
        ["ES", "SPAIN"],
        ["FR", "FRANCE"],
        ["GB", "UNITED KIONGDOM"],
        ["GQ", "1"],
        ["GR", "GREECE"],
        ["HU", "HUNGARY"],
        ["ID", "INDONESIA"],
        ["IE", "IRELAND"],
        ["IN", "INDIA"],
        ["IR", "IRAN"],
        ["IT", "ITALY"],
        ["KE", "KENYA"],
        ["LB", "LEBANON"],
        ["LR", "LIBERIA"],
        ["MV", "MALDIVES"],
        ["NG", "NIGERIA"],
        ["RO", "ROMANIA"],
        ["RU", "RUSSIA"],
        ["SA", "SAUDI ARABIA"],
        ["TN", "TUNISIA"],
        ["UG", "UGANDA"],
        ["US", "UNITED STATES OF AMERICA"],
        ["ZA", "SOUTH AFRICA"]
    ]

//         console.log(countrycode[1][0]);
// console.log(countrycode[2][0]);

    if(value === "AT"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN AUSTRIA";
    }else if(value === "AU"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN AUSTRALIA";
    }else if(value === "AZ"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN AZERBAIJAN";
    }else if(value === "BD"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN BANGLADESH";
    }else if(value === "BE"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN BELGIUM";
    }else if(value === "BH"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN BAHRAIN";
    }else if(value === "BJ"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN BENIN";
    }else if(value === "BR"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN BRAZIL";
    }else if(value === "CA"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN CANADA";
    }else if(value == "CL"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN CHILE";
    }else if(value == "CZ"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN CZECH REPUBLIC";
    }else if(value == "DE"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN GERMANY";
    }else if(value == "DK"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN DENMARK";
    }else if(value == "EE"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN ESTONIA";
    }else if(value == "EG"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN EGYPT";
    }else if(value == "ES"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN SPAIN";
    }else if(value == "FR"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN FRANCE";
    }else if(value == "GB"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN UNITED KIONGDOM";
    }else if(value == "GQ"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN GQ";
    }else if(value == "GR"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN GREECE";
    }else if(value == "HU"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN HUNGARY";
    }else if(value == "ID"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN INDONESIA";
    }else if(value == "IE"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN IRELAND";
    }else if(value == "IN"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN INDIA";
    }else if(value == "IR"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN IRAN";
    }else if(value == "IT"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN ITALY";
    }else if(value == "KE"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN KENYA";
    }else if(value == "LB"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN LEBANON";
    }else if(value == "LR"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN LIBERIA";
    }else if(value == "MV"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN MALDIVES";
    }else if(value == "NG"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN NIGERIA";
    }else if(value == "RO"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN ROMANIA";
    }else if(value == "RU"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN RUSSIA";
    }else if(value == "SA"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN SAUDI ARABIA";
    }else if(value == "TN"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN TUNISIA";
    }else if(value == "UG"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN UGANDA";
    }else if(value == "US"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN UNITED STATES OF AMERICA";
    }else if(value == "ZA"){
        document.getElementById("selectCountry").innerHTML= "TWEETS SENTIMENTS IN SOUTH AFRICA";
    }



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
