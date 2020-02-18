/**
 * Lib
 * TODO
 *
 * @author xxx
 * @version xxx
 * @since xxx
 */
var provinces = new Array('安徽', '北京', '重庆', '福建', '甘肃', '广东', '广西', '贵州', '海南', '河北', '河南',
    ' 黑龙江', '湖北', '湖南', '吉林', '江苏', '江西', '辽宁', '内蒙古', '宁夏', '青海', '山东', '山西', '陕西',
    '上海', '四川', '天津', '西藏', '新疆', '云南', '浙江');
var fs = require('fs');
var readline = require('readline');
exports.readFileToArr =  function (fReadName){
    var fRead = fs.createReadStream(fReadName);
    var objReadline = readline.createInterface({
        input:fRead
    });
    var arr = new Array();
    objReadline.on('line',function (line) {
        arr.push(line);
      });
    objReadline.on('close',function () {
       console.log(arr);
       arr1 = arr;
        // return arr;
    });
}
exports.choiceMessage = async (message,callback)=>{
    var msg1 = "新增 感染患者";
    var msg2 = "新增 疑似患者";
    var msg3 = "感染患者 流入";
    var msg4 = "疑似患者 流入";
    var msg5 = "排除 疑似患者";
    var msg6 = "死亡";
    var msg7 = "治愈";
    var msg8 = "疑似患者 确诊感染";
    var arr = new Array(msg1,msg2,msg3,msg4,msg5,msg6,msg7,msg8);
   for(var i = 0;i<arr.length;i++){
    if(message.search('//')!=-1)  ;
    else if(message.search(arr[i]) != -1 ) callback(i+1); 
    }
}
// 获取人数
exports.getNum = async function(message,callback){
    var reg = /\d+/g;
    // console.log(message.match(reg));
    callback(message.match(reg));
}
//获取省份
exports.getprovinces = function(message,callback){
     var provNmun = Array[2];
     provNmun[0] =provinces.indexOf( message.split(" ")[0]);
     if(provinces.indexOf( message.split(" ")[3]) != -1 )   provNmun[1] = provinces.indexOf( message.split(" ")[3]);
}
//获取人数和省份
exports.getALL = async function(message,callback){
    var reg = /\d+/g;
    var provNmun = Array(2);
    provNmun[0] = provinces.indexOf( message.split(" ")[0]);
    if(provinces.indexOf( message.split(" ")[3]) != -1 )   provNmun[1] = provinces.indexOf( message.split(" ")[3]);
    callback(message.match(reg),provNmun);
}
exports.sum =  function(arr) {
    return eval(arr.join("+"))
}