const express = require("express");
const Joi = require("joi");
const router = express.Router(); 
let users = [
    {id: 1, name: "Gaurav Kumar"},
    {id: 2, name: "Saurav Kumar"},
    {id: 3, name: "Rupesh Kumar"},
]

router.get('/', (req,res)=>{
    res.send(users)
})

router.get('/:id', (req,res)=>{
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if(!user) return res.status(404).send("No user with given Id found");
    res.send(user)
})

router.post("/", (req,res)=>{ 
    const {error} = ValidateUser(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const user = {
        id: Date.now(),
        name: req.body.name
    }
    users.push(user);
    res.send(user)
})

router.put("/:id", (req,res)=>{
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if(!user) return res.status(404).send("No user with given Id found");
    const {error} = ValidateUser(req.body)
    if(error) return res.status(400).send(error.details[0].message);
    user.name = req.body.name
    res.send(user)
})

router.delete('/:id', (req,res)=>{
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if(!user) return res.status(404).send("No user with given Id found");
    const userIndex = users.findIndex(u => u === user);
    users.splice(userIndex,1);
    res.send(user)
})


function ValidateUser(user){
    const schema = Joi.object({
        name: Joi.string().min(3).required().messages({
            'string.min': 'Name must contain at least 3 letters'
        }),
    })
    return schema.validate(user);
}

module.exports = router