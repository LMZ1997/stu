const buf=new Buffer(5);
console.log(buf);

const buf1 = new Buffer('buffer');
const buf2 = new Buffer(buf1);
buf1[0] = 0x61;//0x61==a
// 输出: auffer
console.log(buf1.toString());
// Prints: buffer
console.log(buf2.toString());


const buf3 = Buffer.alloc(5);
// 输出: <Buffer 00 00 00 00 00>
console.log(buf3);
const buf4 = Buffer.alloc(5, 'a');
// 输出: <Buffer 61 61 61 61 61>
console.log(buf4);