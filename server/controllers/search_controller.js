const swag = require("../models/swag")

module.exports = {
    search: (req, res, next) => {
        if(!req.query.category) {
            res.status(200).send(swag)
        }
        else {
            filterSwag = swag.filter(swag => swag.category === req.query.category)
            if(filterSwag.length <= 0) {
                res.status(200).send(swag)
            }
            res.status(200).send(filterSwag)
        }
    }
}