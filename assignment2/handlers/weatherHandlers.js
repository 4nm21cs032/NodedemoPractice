const fs = require("fs")

const weather = JSON.parse(fs.readFileSync(`${__dirname}/../data/weather.json`));

exports.showAllDetails=(req,res)=>{
    res.status(200)
    res.json(
        {
            status: "Sucess",
            results: weather.length,
            requestTime: req.requestTime,
            data: {
                weatherInfo: weather
            }
        }
    )
}

exports.showRainDetails=(req,res)=>{
    const rainCities= weather.filter(city=>city.rain)
    res.json(rainCities)
}
exports.addNewCityTempDetails=(req,res)=>{
    const {city,temperature,humidity,windSpeed,condition,rain}=req.body
    weather.push({ city, temperature, humidity, windSpeed, condition, rain })
    fs.writeFileSync(`${__dirname}/../data/weather.json`, JSON.stringify(weather), (err) => {
        res.status(201)
            .json({
                status: "Sucessfully addded",
                weather: weather
            })
    })
    res.send("Added sucessfully");
}

exports.changeRainDetails=(req, res) => {
    const cityData = weather.find(data => data.city.toLowerCase() === req.params.city.toLowerCase());
    if(cityData == null){
        res.status(404);
        res.json({
            status: "city not found"
        })
    }
    weather.forEach(data => {
        if (data.city.toLowerCase() == req.params.city.toLowerCase()) {
            data.rain = false;
        }
    });
    fs.writeFileSync(`${__dirname}/../data/weather.json`, JSON.stringify(weather));
    res.json({
        status: "changed successfully"
    })
}

exports.removeCityDetails=(req, res) => {
    const city = req.params.city;
    const index = weather.findIndex(data => data.city.toLowerCase() == city.toLowerCase()) || -1;
    if (index == -1) {
        res.status(404)
        res.json({
            status: "City weather data not found"
        })
    }
    weather.splice(index, 1);
    fs.writeFileSync(`${__dirname}/../data/weather.json`, JSON.stringify(weather));
    res.status(202)
        .json({
            status: "deleted Successfully"
        })
}

exports.showCityDetails=(req,res)=>{
    const cityData = weather.find(data => data.city.toLowerCase() === req.params.city.toLowerCase());
    if(cityData == null){
        res.status(404);
        res.json({
            status: "city not found"
        })
    }
    res.status(200)
        .json({
            status: "Weather data found",
            data: {
                cityData
            }
        })
}