const Router=require('express').Router;
const router=Router();

router.post('/',(req,res)=>{//只接收一个‘/’,因为系统经过/uesr请求，再请求时只剩下‘/’
	res.send('post blog data...')
})
router.get('/',(req,res)=>{
	res.send('get blog data..~.')
})
router.put('/',(req,res)=>{
	res.send('put blog data...')
})
router.delete('/',(req,res)=>{
	res.send('delete blog data...')
})


module.exports=router;