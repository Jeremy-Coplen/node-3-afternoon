require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const session = require("express-session")

const checkForSession = require("./middlewares/checkForSession")
const sc = require("./controllers/swag_controller")
const ac = require("./controllers/auth_controller")
const cc = require("./controllers/cart_controller")
const searchc = require("./controllers/search_controller")

const app = express()
app.use(bodyParser.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(checkForSession)
app.use(express.static(`${__dirname}/build`))

app.get("/api/swag", sc.read)
app.post("/api/login", ac.login)
app.post("/api/register", ac.register)
app.post("/api/signout", ac.signout)
app.get("/api/user", ac.getUser)
app.post("/api/cart", cc.add)
app.post("/api/cart/checkout", cc.checkout)
app.delete("/api/cart", cc.delete)
app.get("/api/search", searchc.search)

const port = process.env.PORT || 3005
app.listen(port, () => console.log(`Server started on port ${port}`))