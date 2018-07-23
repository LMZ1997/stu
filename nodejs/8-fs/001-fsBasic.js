const fs= require('fs');
//打开文件
let fd =fs.openSync('./001.txt','w')//第二个参数根据我们打开文件是干什么的而决定(比如要写入内容,传‘w’)
                   //path路径  
//fd即返回的文件描述file description

//读写内容
fs.writeSync(fd,'aa');
//保存并退出
fs.closeSync(fd);