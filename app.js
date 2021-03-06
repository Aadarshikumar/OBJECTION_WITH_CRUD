const express = require("express")
const app = express();
const port = 2022
const UserServices = require("./services/user.services");
const services = new UserServices();
const joi = require('joi');
app.use(express.json());



//// CREATE YOUR DATA AND INSERT IT
app.post("/create", async(req, res) => {
    const {name, email, password} = req.body

    const schema = joi.object({
        name: joi.string().max(20).min(3).required(),
        email: joi.string().min(10).max(100).email().required(),
        password: joi.string().min(8).max(16).required()
    })
    let result = schema.validate(req.body)
    if (result.error){
        res.send("please write valid email and Password")
        res.status(400).send(result.error[0])
        return;

    }
    try {
        const result = await services.createUser({name, email, password})
        if (!result) return res.send("data already exit")
        res.send("inserted")
    } catch (error) {
        res.status(500).send(error.message)
    }
})

//// Read all the inserted Data
app.get("/read", (req, res) => {
    services.getUser().then(data => {
        res.send(data)
    }).catch(err => {
        res.send(err)
    })
})


//// READ YOUR PARTICULAR DATA BY YOUR ID
app.get("/read_particular/:id", (req, res) => {
    services.particularData(req.params.id).then(data =>{
        res.send(data)
    }).catch(err => {
        res.send(err)
    })
})


//// UPDATE YOUR PARTICULAR DATA BY YOUR ID
app.put("/update/:id", (req, res) => {
    services.updateUserById(req.params.id, req.body).then(data =>{
        res.send(data)
    }).catch(err => {
        res.send(err)
    })
})



//// DELETING YOUR PARTICULAR DATA BY YOUR ID
app.delete("/delete/:id", (req, res) => {
    services.deleteUserById(req.params.id).then(data => {
        res.send(data)
    }).catch(err => {
        res.send(err)
    })
})



app.listen(port, () => {
    console.log(`server listening on ${port}`);
})



///// console.log("Navgurukul")