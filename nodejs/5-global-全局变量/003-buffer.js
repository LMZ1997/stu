const buf=new Buffer(5);//new Buffer是被遗弃的
console.log(buf);

const buf1 = Buffer.from('buffer');
const buf2 =Buffer.from(buf1);


console.log(buf1.toString());
// Prints: buffer
console.log(buf2.toString());


const buf3 = Buffer.alloc(5);
// 输出: <Buffer 00 00 00 00 00>
console.log(buf3);
const buf4 = Buffer.alloc(5, 'a');
buf4[0]=10;
buf4[1]=0x10;//16进制
buf4[4]=11;
buf4[5]=100000000000000000000000000;//没有下标为5的，所以没用
console.log(buf4);
