const users = require("../models/users")

let id = 1

module.exports = {
    login: (req, res, next) => {
        const user = users.find(user => user.username === req.body.username && user.password === req.body.password)

        if(user) {
            req.session.user.username = user.username
            res.status(200).send(req.session.user)
        }
        else {
            res.status(403).send("Unauthorized")
        }
    },

    register: (req, res, next) => {
        users.push({id: id, username: req.body.username, password: req.body.password})
        req.session.user.username = req.body.username
        id++
        res.status(200).send(req.session.user)
    },

    signout: (req, res, next) => {
        req.session.destroy()
        res.status(200).send(req.session)
    },

    getUser: (req, res, next) => {
        res.status(200).send(req.session.user)
    }
}