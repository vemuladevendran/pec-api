const {verify} = require('./token')


const verifyToken = async(req, res, next) => {
    const token = req.headers['authorization'].split('Bearer ').pop();;
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = await verify(token);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = {
    verifyToken,
}