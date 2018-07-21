console.log(1);

	let t1=setTimeout(()=>{//异步
		console.log(2)
	},1000);
	clearTimeout(t1);

	let t2=setInterval(()=>{
		console.log(2)
	},1000)
	clearInterval(t2);

	let t3=setImmediate(()=>{//立即执行，只不过是异步处理，可以使本该同步的代码异步执行
		console.log(2)
	})
	// clearImmediate(t3);

console.log(3)