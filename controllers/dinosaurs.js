const express = require("express")
const router = express.Router()
const fs = require("fs")

// lists all dinosaurs
router.get('/', (req, res) => {
    let dinosaurs = fs.readFileSync("./dinosaurs.json");
    let dinoData = JSON.parse(dinosaurs);
    res.render("dinosaurs/index", {myDinos: dinoData});
  })


  
  router.get("/new", (req,res) => {
      res.render("dinosaurs/new")
    } )
    
    router.get("/:idx", (req, res) => {
        // get dinosaurs
        let dinosaurs = fs.readFileSync("./dinosaurs.json");
        let dinoData = JSON.parse(dinosaurs);
        console.log("This is the req.params objects") 
        let dinoIndex = parseInt(req.params.idx);
        res.render("dinosaurs/show", {myDino: dinoData[dinoIndex]});
       })

  router.post("/", (req, res) => {
    console.log("This is the request body ", req.body)

      let dinosaurs = fs.readFileSync("./dinosaurs.json")
      let dinoData = JSON.parse(dinosaurs)
      dinoData.push(req.body)
      fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData))
      //JSON stringify makes it back into json data
    res.redirect("/dinosaurs")
  })

  router.delete("/:idx", (req,res) => {
    console.log('this is my Req Params objects', req.params)

    let dinosaurs = fs.readFileSync("./dinosaurs.json");
    let dinoData = JSON.parse(dinosaurs)

    dinoData.splice(req.params.idx, 1)
    fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData));
    res.redirect("/dinosaurs");

  })

  router.get("/edit/:idx", (req,res) => {
    // grab dino data
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)
    //display edit page 
    res.render("dinosaurs/edit" , {
        dino: dinoData[req.params.idx], 
        dinoId: req.params.idx})
  })

  router.put("/:dinoId", (req, res) => {
    let dinosaurs = fs.readFileSync("./dinosaurs.json")
    
    let dinoData = JSON.parse(dinosaurs)
    console.log(req.body)
    dinoData[req.params.dinoId].name = req.body.name
    dinoData[req.params.dinoId].type = req.body.type
    console.log(dinoData)

    fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData))
    res.redirect("/dinosaurs")
  })


    module.exports = router;
    
    