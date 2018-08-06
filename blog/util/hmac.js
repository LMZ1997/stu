const crypto = require('crypto');

// const hash = crypto.createHash('sha256');//hash加密法
// const hash = crypto.createHash('sha512');


// const hmac = crypto.createHmac('sha256', 'LMZ');

module.exports=(str)=>{
	const hmac = crypto.createHmac('sha256', 'LMZ');

	hmac.update(str);
	return hmac.digest('hex')
}

