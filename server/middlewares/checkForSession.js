module.exports = function (req, res, next) {
    !req.session.user ? req.session.user = {username: "", cart: [], total: 0} : next()
    next()
}