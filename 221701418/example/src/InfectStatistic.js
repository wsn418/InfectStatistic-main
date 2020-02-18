// ist命令 支持以下命令行参数：
// -log 指定日志目录的位置，该项必会附带，请直接使用传入的路径，而不是自己设置路径
// -out 指定输出文件路径和文件名，该项必会附带，请直接使用传入的路径，而不是自己设置路径
// -date 指定日期，不设置则默认为所提供日志最新的一天。你需要确保你处理了指定日期之前的所有log文件
// -type 可选择[ip： infection patients 感染患者，sp： suspected patients 疑似患者，cure：治愈 ，
//     dead：死亡患者]，使用缩写选择，如 -type ip 表示只列出感染患者的情况，-type sp cure则会按顺序
//     【sp, cure】列出疑似患者和治愈患者的情况，不指定该项默认会列出所有情况。
// -province 指定列出的省，如-province 福建，则只列出福建，-province 全国 浙江则只会列出全国、浙江
// 注：java InfectStatistic表示执行主类InfectStatistic，list为命令，-date代表该命令附带的参数，
// -date后边跟着具体的参数值，如2020-01-22。-type 的多个参数值会用空格分离，每个命令参数都在上方给出了描述，
// 每个命令都会携带一到多个命令参数
var filesTool = require('./Lib');

//0.数据处理
var provinces = new Array('安徽', '北京', '重庆', '福建', '甘肃', '广东', '广西', '贵州', '海南', '河北', '河南',
    ' 黑龙江', '湖北', '湖南', '吉林', '江苏', '江西', '辽宁', '内蒙古', '宁夏', '青海', '山东', '山西', '陕西',
    '上海', '四川', '天津', '西藏', '新疆', '云南', '浙江');

//疑似
let sp = new Array(31);
sp.fill(0);
//感染
let ip = new Array(31);
ip.fill(0);
//痊愈
let cure = new Array(31);
cure.fill(0);
//死亡
let dead = new Array(31);
dead.fill(0);

//1.处理命令行
const argv = process.argv
 console.log(argv);
//node InfectStatistic list -date 2020-01-22 -log D:/log/ -out D:/output.txt
 console.log(argv.indexOf('-log'));
var log = argv[argv[argv.indexOf('-log')+1]];
//var log = "D:/log/";
var out = argv[argv[argv.indexOf('-out')+1]];
//2.读取文件
//a.获取文件夹名字
var fs = require("fs");
var path = require('path')
var readline = require('readline');


fs.readdir(log, function (err, files) {
    if (err) {
        return console.error(err);
    }
    var data = new Array();
   for( let j = 0;j<files.length;j++){
        // var logs = path.resolve("__dirname, '../log/'" + files[j]);
        var logs = path.resolve(log + files[j]);
        var fRead = fs.createReadStream(logs);
            var objReadline = readline.createInterface({
                input:fRead
            });
            objReadline.on('line',function (line) {
                data.push(line);
              });
            if(j == files.length - 1)
            objReadline.on('close',function () {
                // console.log(data)              
                for (var i = 0; i < data.length; i++) {
                    filesTool.choiceMessage(data[i], (msgNum) => {
                        //   console.log(msgNum + data[i]);
                        switch (msgNum) {
                            case 1:
                                filesTool.getALL(data[i], (num, provinNum) => {
                                    ip[provinNum[0]] += Number(num);
                                });
                                break;
                            case 2:
                                filesTool.getALL(data[i], (num, provinNum) => {
                                    sp[provinNum[0]] += Number(num);
                                });
                                break;
                            case 3:
                                filesTool.getALL(data[i], (num, provinNum) => {
                                    ip[provinNum[0]] -= num;
                                    ip[provinNum[1]] += Number(num);
                                });
                                break;
                            case 4:
                                filesTool.getALL(data[i], (num, provinNum) => {
                                    sp[provinNum[0]] -= num;
                                    sp[provinNum[1]] += Number(num);
                                });
                                break;
                            case 5:
                                filesTool.getALL(data[i], (num, provinNum) => {
                                    sp[provinNum[0]] -= num;
                                });
                                break;
                            case 6:
                                filesTool.getALL(data[i], (num, provinNum) => {
                                    dead[provinNum[0]] += Number(num);
                                    ip[provinNum[0]] -= num;
                                });
                                break;
                            case 7:
                                filesTool.getALL(data[i], (num, provinNum) => {
                                    ip[provinNum[0]] -= num;
                                    cure[provinNum[0]] += Number(num);
                                });
                                break;
                            case 8:
                                filesTool.getALL(data[i], (num, provinNum) => {
                                    ip[provinNum[0]] += Number(num);
                                    sp[provinNum[0]] -= num;
                                });
                                break;
                        }
                    
                    });
    
                }
               
            if(j == files.length-1){
            
                var str = "";
                str+="全国"+" "+"感染患者"+" "+filesTool.sum(ip)+"人 "+"疑似患者"+" "+
                filesTool.sum(sp)+"人 "+"治愈"+" "+filesTool.sum(cure)+"人 "+"死亡"+filesTool.sum(dead)+"人 "+'\n';
                for(var i = 0;i<provinces.length;i++){
                    str+=provinces[i]+" "+"感染患者"+" "+ip[i]+"人 "+"疑似患者"+" "+
                    sp[i]+"人 "+"治愈"+" "+cure[i]+"人 "+"死亡"+dead[i]+"人 "+'\n';
                }
                
                
                fs.appendFile(out, str,err=>function () {}); 
                
                
            
            }

            });
        }
   
});


//b.获取文件信息
