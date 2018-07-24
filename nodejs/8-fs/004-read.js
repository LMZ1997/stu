


						/*异步·读文件*/
const fs=require('fs');
fs.open('./001.txt','r',(err,fd)=>{
	if(!err){
		let buf=Buffer.alloc(100);

		fs.read(fd,buf,0,100,0,(err)=>{
			if(!err){
				fs.close(fd,(err)=>{
					if(!err){
						console.log('close file success')
						console.log(buf)
					}
					else{
						console.log('close file error',err)
					}
				})
			}
			else{	
				console.log('read file error::',err)
			}
		})
	}	
	else{
		console.log('open file error:::',err)
	}
})
