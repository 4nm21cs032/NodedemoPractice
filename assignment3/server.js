const dotenv = require("dotenv")
const app = require("./app")
const mongoose = require("mongoose")

dotenv.config({ path: "./config.env" })

const port = process.env.port || 3000

mongoose.connect(process.env.DB_LOCAL)
    .then((con) => {
        console.log(("Connection done succesfully\n"));
        // console.log(con.connection)
    })
    .catch((err) => {
        console.log(("Connection Failed", err));
    })

app.listen(port, () => {
    console.log(`MongoDemo app running`)
})