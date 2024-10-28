const express = require("express")
const fs = require("fs");
const weatherHandler = require("./../handlers/weatherHandlers");

const weatherRouter = express.Router()

weatherRouter.get("/",weatherHandler.showAllDetails)

weatherRouter.get('/showRainDetails', weatherHandler.showRainDetails);

weatherRouter.post('/addNewCityTempDetails', weatherHandler.addNewCityTempDetails);

weatherRouter.put('/changeRainDetails/:city', weatherHandler.changeRainDetails);

weatherRouter.delete('/removeCityDetails/:city', weatherHandler.removeCityDetails);

weatherRouter.get('/showCityDetails/:city', weatherHandler.showCityDetails);

module.exports = weatherRouter