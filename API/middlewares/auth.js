const jwt = require('jsonwebtoken')


const auth = (req, res, next) => {
    try {
        // décode le token
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        
        if (!decodedToken) {
            throw 'Req non autorisée'
        } else {
            next();
        }

    } catch (error) {
        res.status(401).json({ error: error, message: 'requête non authentifiée' })
    }
}

module.exports = auth;