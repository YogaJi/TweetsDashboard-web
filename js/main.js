/**
 APIs get from https://api.exchangerate.host
**/


// API URL
var latestUrl = "https://api.exchangerate.host/latest";
var allSymbolsUrl = "https://api.exchangerate.host/symbols";
var convertUrl = "https://api.exchangerate.host/convert";
var timeseriesUrl = "https://api.exchangerate.host/timeseries";

var baseElm = $("#base");
var targetElm = $("#target");
var baseAmount = $("#baseNumber");
var targetAmount = $("#targetNumber");
var ratesElm = $("#rate_list");
var rateTrendChart = $("#myChart");

var currencies = null;


$(document).ready(function() {
    $.initcurrencies();

});

$.extend({
    initcurrencies:function() {
       $.ajax({
           url: allSymbolsUrl,
           type: "GET",
           dataType: "json",
           success: function(json) {
                //alert("1-"+json.success);
               if (json.success == false) {
                    $.handleError(102, null);
               } else {

                    baseElm.empty();
                    targetElm.empty();
                    currencies = json.symbols;
                    $.each(json.symbols, function (keyStr, valueStr) {
                        baseElm.append($("<option/>", {
                            value: keyStr,
                            text: keyStr,
                            id: "currencyFrom_" + keyStr
                        }));
                        if(keyStr == "CNY"){
                            baseElm.val(keyStr);
                            //baseElm.find("option[text='" + keyStr + "']").attr("selected",true);
                        }

                        targetElm.append($("<option/>", {
                            value: keyStr,
                            text: keyStr,
                            id: "currencyTo_" + keyStr
                        }));
                        if(keyStr == "CAD"){
                            targetElm.val(keyStr);
                            //baseElm.find("option[text='" + keyStr + "']").attr("selected",true);
                        }
                     })
                     $.initConvertAmount();
                     $.initAllLatestRate();
               }
           },
           error:function(XMLHttpRequest, textStatus, errorThrown){
            //    alert("XMLHttpRequest.status-"+XMLHttpRequest.status);
            //    alert("XMLHttpRequest.responseText-"+JSON.stringify(XMLHttpRequest));
                $.handleError(XMLHttpRequest.status, textStatus);
            }
        });
    },

    initConvertAmount:function() {

        $.ajax({
            url: convertUrl,
            type: "GET",
            dataType: "json",
            data: {"from": baseElm.val(), "to": targetElm.val(), "amount": baseAmount.val()},
            success: function(json) {
                 //alert("1-"+json.success);
                if (json.success == false) {
                     $.handleError(102, null);
                } else {
                     targetAmount.val(json.result);
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                 $.handleError(XMLHttpRequest.status, textStatus);
             }
         });

    },

    initAllLatestRate:function() {
        $.ajax({
            url: latestUrl,
            type: "GET",
            data: {"base": baseElm.val(), "amount" : 1},
            dataType: "json",
            success: function(json) {
                 //alert("1-"+json.success);
                if (json.success == false) {
                    $.handleError(101, null);
                } else {
                    var updateDate = json.date;
                    ratesElm.empty();

                    var liElmHtml = "<li class='list-group-item'> " +
                                "<div class='chart-local-currency'>Local Currency: 1.0 <span id='from_currency'>" + baseElm.val() + "</span></div></li>";

                    var thDivHtml = "<li class='list-group-item'>" +
                                    "<div class='row chart-list-row'>" +
                                    "<div class='col list-category'> Currency </div>" +
                                    "<div class='col list-category'> Exchange Rate </div>" +
                                    "<div class='col-1'></div> " +
                                    "<div class='col list-category'> Update Time </div>" +
                                    "</div></li>";

                    ratesElm.append(liElmHtml, thDivHtml);

                    $.each(json.rates, function (keyStr, valueStr) {
                         var cname = null;
                         cname = keyStr;
                         if(currencies != null){
                            $.each(currencies, function(cKey,cVal){
                                if(cKey == keyStr) {
                                    cname += " | " + cVal.description;
                                    return true;
                                }
                            });
                         }

                         var thDivHtml2 = null;
                         if (keyStr == targetElm.val()) {
                            thDivHtml2 = "<li class='list-group-item li-selected'>";
                         } else {
                            thDivHtml2 = "<li class='list-group-item'>";
                         }
                         thDivHtml2 += "<input type='hidden' value='"+ keyStr +"'/>" +
                                    "<div class='row chart-list-row'>" +
                                    "<div class='col'> "+ cname +" </div>" +
                                    "<div class='col'> "+ valueStr +" </div>" +
                                    "<div class='col-1'></div> " +
                                    "<div class='col'> "+ updateDate +" </div>" +
                                    "</div></li>";

                        ratesElm.append(thDivHtml2);

                    })
                    $(".list-group").on("click","li",function(){
                        console.log('NO.'+$(this).index()+'li is clicked');
                        $(".list-group li").removeClass("li-selected");
                        if($(this).index() >= 2 ){
                            $(this).addClass("li-selected");
                            console.log($(this).find("input[type='hidden']").val());
                            let targetC = $(this).find("input[type='hidden']").val();
                            $.initTimeseries(baseElm.val(), targetC);
                        }

                    });
                    $.initTimeseries(baseElm.val(), targetElm.val());

                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                $.handleError(XMLHttpRequest.status, textStatus);
             }
         });

    },

    initTimeseries:function(baseCurrency, targetCurrency){
        // Default: get the latest week's data
        let dateArry = [];
        let rateArry = [];
        let beginDate = $.getPrevDate(new Date(), 6);
        let endDate = $.setDefaultDate(new Date());
        console.log(beginDate);
        console.log(endDate);

        $.ajax({
            url: timeseriesUrl,
            type: "GET",
            data: {"base": baseCurrency, "symbols": targetCurrency, "start_date" : beginDate, "end_date": endDate},
            dataType: "json",
            success: function(json) {
                 //alert("1-"+json.success);
                if (json.success == false) {
                    $.handleError(101, null);
                } else {
                    //alert("2-"+json.rates + JSON.stringify(json.rates));
                    //console.log("2-"+json.rates + JSON.stringify(json.rates));

                    $.each(json.rates, function (keyStr, valueStr) {
                        dateArry.push(keyStr);
                        // console.log(valueStr);
                        // console.log(valueStr[targetCurrency]);
                        if(valueStr[targetCurrency] == null){
                            rateArry.push(0);
                        } else {
                            rateArry.push(valueStr[targetCurrency]);
                        }

                    });
                    initChart(rateArry, dateArry, baseCurrency, targetCurrency);
                    // console.log(dateArry);
                    // console.log(rateArry);

                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                alert("XMLHttpRequest.status-"+XMLHttpRequest.status);
                var result = eval("("+XMLHttpRequest.responseText+")");
                alert(result.exception.message);
                $.handleError(XMLHttpRequest.status, result.exception.message);
             }
         });


    },



    setDefaultDate:function(nowDate){
        var month = nowDate.getMonth() + 1;
        var day = nowDate.getDate();
        month = (month.toString().length == 1) ? ("0" + month) : month;
        day = (day.toString().length == 1) ? ("0" + day) : day;
        //yyyy-MM-dd
        return nowDate.getFullYear() + '-' + month + '-' + day;
    },

    getPrevDate:function(nowDate, days){
        var yesterdsay = new Date(nowDate.getTime() - 86400000 * days);//86400000 is milliseconds of one day
        var year = yesterdsay.getFullYear();
        var month = yesterdsay.getMonth() + 1;
        if(month < 10){
            month = "0" + month;
        }
        var date = yesterdsay.getDate();
        if(date < 10){
            date = "0" + month;
        }
        var prevDate = year + "-" + month + "-" + date;
        return prevDate;
    },


    handleError:function(rCode, rMsg) {
        alert("error:" + rCode);
        switch(rCode){
            case 404:
                if(rMsg == null){
                    alert("Error:" + rCode + " - The requested resource does not exist.");
                } else {
                    alert("Error:" + rCode + " - " +rMsg);
                }
                break;
            case 101:
                if(rMsg == null){
                    alert("An invalid base currency has been entered.");
                } else {
                    alert("Error:" + rCode + " - " +rMsg);
                }
                break;
            case 102:
                if(rMsg == null){
                    alert("One or more invalid symbols have been specified.");
                } else {
                    alert("Error:" + rCode + " - " +rMsg);
                }
                break;
            case 103:
                if(rMsg == null){
                    alert("No date has been specified. [historical]");
                } else {
                    alert("Error:" + rCode + " - " +rMsg);
                }
                break;
            case 104:
                if(rMsg == null){
                    alert("An invalid date has been specified. [historical, convert]");
                } else {
                    alert("Error:" + rCode + " - " +rMsg);
                }
                break;
            case 105:
                if(rMsg == null){
                    alert("No or an invalid amount has been specified. [convert]");
                } else {
                    alert("Error:" + rCode + " - " +rMsg);
                }
                break;
            case 106:
                if(rMsg == null){
                    alert("No or an invalid 'start_date' has been specified. [timeseries, fluctuation]");
                } else {
                    alert("Error:" + rCode + " - " +rMsg);
                }
                break;
            case 107:
                if(rMsg == null){
                    alert("No or an invalid 'end_date' has been specified. [timeseries, fluctuation]");
                } else {
                    alert("Error:" + rCode + " - " +rMsg);
                }
                break;

        }
    }
});


$(document).on("keyup", function(event){
    if(event.keyCode ==13){
        $.initConvertAmount();
    }
});

//on event
baseElm.on("change", function(event){
    $.initConvertAmount();
    $.initAllLatestRate();
    $.initTimeseries(baseElm.val(), targetElm.val());
});

targetElm.on("change", function(event){
    $.initConvertAmount();
    $.initAllLatestRate();
    $.initTimeseries(baseElm.val(), targetElm.val());
});

$("#transform").on("click", function(event){
    let baseO = baseElm.val();
    baseElm.val(targetElm.val());
    targetElm.val(baseO);
    $.initConvertAmount();
    console.log(baseElm.val()+"--"+targetElm.val());
    $.initAllLatestRate();
    $.initTimeseries(baseElm.val(), targetElm.val());
});
