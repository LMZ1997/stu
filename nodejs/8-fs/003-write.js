

					/*异步·写文件*/
const fs=require('fs');

fs.open('./001.txt','w',(err,fd)=>{//fd即文件描述(file description),可从open函数的返回值获得
	if(!err){
		fs.write(fd,'bbbb',(err)=>{//对应文件内容为bbbb
			if(!err){
				fs.close(fd,(err)=>{
					if(!err){
						console.log('close file success...')
					}
					else{
						console.log('close file error....')
					}
				})
			}
			else{
				console.log('write file error...')
			}
		})
	}
	else{
		console.log('open file error...')
	}
})