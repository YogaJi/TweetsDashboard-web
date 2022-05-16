function  getDates(timestamp) {
         var  date =  new  Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
         Y = date.getFullYear() +  '-' ;
         M = (date.getMonth()+1 < 10 ?  '0' +(date.getMonth()+1) : date.getMonth()+1) +  '-' ;
         D = date.getDate() +  ' ' ;
         return  Y+M+D;
     }
     // timestampToTime(1403058804);
     // console.log(timestampToTime(1403058804)); //2014-06-18 10:33:24
