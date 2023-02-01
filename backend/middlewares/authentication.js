const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log(' ======== authentication =========')
    console.log(req.cookies);
    if (req.cookies.access_token) {
        const verified = jwt.verify(req.cookies.access_token, process.env.client_secret);
        console.log(verified)
    }
    console.log(' ======== authentication end ========')
    next()
}