const jwt = require("jsonwebtoken");


module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({msg:'no token, auth denied'});
    }
    try {
        const decoded = jwt.verify(token,config.jwtSecret);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({msg:'token not valid!'})
    }
};
