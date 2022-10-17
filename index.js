// line for adding the node packages
const express = require("express")
const ejsLayouts = require("express-ejs-layouts")
const methodOverride = require("method-override")
const app = express()

//MIDDLEWARE
app.set("view engine", "ejs")
app.use(ejsLayouts)
app.use(methodOverride("_method"))

//this line of code is for the URL form to print out the request body otherwise it comeout as undefined
app.use(express.urlencoded({extended:false}))


//ROUTES
app.use("/dinosaurs", require("./controllers/dinosaurs.js"))


app.use("/prehistoric", require("./controllers/prehistoric.js"))



app.listen(3500, () => {
    console.log("app listening on port 3500")
})