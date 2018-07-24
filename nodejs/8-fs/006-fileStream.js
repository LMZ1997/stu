const fs=require('fs');

const ws=fs.createWriteStream('./ws.txt');
const rs=fs.createReadStream('./rs.txt');

ws.on('finish',()=>{
	console.log('finish...')
})
ws.write('xxxxxx');
ws.write('\nyyyyyy');
ws.end();

rs.on('data',(chunk)=>{
	console.log(chunk)
});
rs.on('end',()=>{
	console.log('end....')
})
// rs.pipe(ws);//可将可读流中的内容通过管道传入可写流中