// console.log(process);
console.log('返回文件地址的数组::',process.argv);//可以在调用时输入参数，node 001-process.js aaa bbb
console.log(process.argv[1]);
console.log('返回一个表示操作系统CPU架构的字符串:::',process.arch)
console.log('系统进程id:::',process.pid)
console.log('系统:::',process.platform)
console.log('返回一个包含用户环境信息的对象',process.env)