const Router=require('express').Router;
const router=Router();

router.post('/',(req,res)=>{
	res.send('post user data...')
})
router.get('/',(req,res)=>{
	res.send('get user data....')
})
router.put('/',(req,res)=>{
	res.send('put user data...')
})
router.delete('/:id',(req,res)=>{//     /user/001(请求地址/id名)
	// console.log(res.params.id)
	res.send('delete user data...id='+req.params.id)
})


module.exports=router;