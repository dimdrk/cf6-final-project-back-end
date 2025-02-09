const jwt = require('jsonwebtoken');

exports.verifyAccessToken = (token) => {
    const secret = process.env.JWT_SECRET_KEY;

    try{
        const decoded = jwt.verify(token, secret);
        return {success: true, data: decoded};
    } catch(e){
        return {success: false, error: e.message};
    }
}

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.sendStatus(401);
    }

    const result = this.verifyAccessToken(token);

    if(!result.success){
        return res.status(403).json({ error: result.error })
    } 

    req.user = result;
    next()
}