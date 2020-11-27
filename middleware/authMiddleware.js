const jwt = require('jsonwebtoken');


module.exports = {verifyAccessToken: (req,res,next)=>{
    if (!req.headers['authorization']) return next(res.json({
        message: 'Not Authorized'
    }))
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload)=>{
        if(err){
            return next(res.json({
                error: err
            }))
        }
        req.payload = payload
        next()
    })
    }
}