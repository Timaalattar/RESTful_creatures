const express = require("express")
const router = express.Router()
const fs = require("fs")


router.get('/', (req, res) => {
    let prehistoric = fs.readFileSync("./prehistoric_creatures.json");
    let preData = JSON.parse(prehistoric);
    res.render("prehistoric/index", {myPrehistoric: preData});
  })

router.get("/new", (req,res) => {
    res.render("prehistoric/new")
  })

router.get("/:idx", (req, res) => {
   
  let prehistoric = fs.readFileSync("./prehistoric_creatures.json");
  let preData = JSON.parse(prehistoric);
  let preIndex = parseInt(req.params.idx);
    res.render("prehistoric/show", {myPre: preData[preIndex]});
   })  

  router.post("/", (req, res) => {
    let prehistoric = fs.readFileSync("./prehistoric_creatures.json")
    let preData = JSON.parse(prehistoric)
    preData.push(req.body)
    fs.writeFileSync("./prehistoric_creatures.json", JSON.stringify(preData))

    res.redirect("/prehistoric")
  })

  router.delete("/:idx", (req,res) => {
    let prehistoric = fs.readFileSync("./prehistoric_creatures.json");
    let preData = JSON.parse(prehistoric)

    preData.splice(req.params.idx, 1)
    fs.writeFileSync("./prehistoric_creatures.json", JSON.stringify(preData));
    res.redirect("/prehistoric");

  })

  router.get("/edit/:idx", (req,res) => {

    let prehistoric = fs.readFileSync("./prehistoric_creatures.json")
    let preData = JSON.parse(prehistoric)
  
    res.render("prehistoric/edit" , {
       pre: preData[req.params.idx], 
       preId: req.params.idx})
  })

  router.put("/:preId", (req, res) => {
    let prehistoric = fs.readFileSync("./prehistoric_creatures.json")

    let preData = JSON.parse(prehistoric)
    preData[req.params.preId].name = req.body.name
    preData[req.params.preId].type = req.body.type

    fs.writeFileSync("./prehistoric_creatures.json", JSON.stringify(preData))
    res.redirect("/prehistoric")
  })


  module.exports = router;