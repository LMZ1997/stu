
					/*同步·读文件*/
const fs=require('fs');

let fd =fs.openSync('./001.txt','r');
console.log(fd);
let buf=Buffer.alloc(100);

fs.readSync(fd,buf,0,100,0);//fs.readSync(fd, buffer, offset, length, position)
				//第一个0表示buf中开始读入的位置
				//100表示读取buf的长度
				//第二个0表示对应文件开始读取的位置
fs.closeSync(fd);
console.log(buf)///*<Buffer 61 61 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00...
					//		a   a