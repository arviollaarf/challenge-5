const express = require('express');
var bodyParser = require('body-parser');

const app = express()
const port = 5000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const { getUsers, Register, Login, Logout, registerAdmin } = require("./controllers/userController");
const { getCars, getCarById, getDeletedCars, deleteCar, updateCar, createCar } = require('./controllers/carController')
const { verifyToken } = require("./middleware/VerifyToken")

const prefix = "/v1/api/";

app.get('/', (req, res) => {
    res.send('Car API')
})

//user 
app.get(prefix + "users", verifyToken, getUsers);
app.post(prefix + "register", Register);
app.post(prefix + "login", Login);
app.delete(prefix + "logout", Logout);
app.post(prefix + "registeradmin", verifyToken, registerAdmin);

//cars
app.get(prefix + "cars", verifyToken, getCars);
app.get(prefix + "car/:id", verifyToken, getCarById);
app.get(prefix + "deletedcar", verifyToken, getDeletedCars);
app.put(prefix + "updatecar/:id", verifyToken, updateCar); 
app.put(prefix + "car/:id", verifyToken, deleteCar); 
app.post(prefix + "createcar", verifyToken, createCar);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})