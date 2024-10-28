const app=require("./app")
const dotenv=require("dotenv")

dotenv.config({path:"./config.env"})
console.log(process.env)

const port =process.env.port || 3000
app.listen(port,()=>{
    console.log(`Express app running in http://localhost:${port}`)
})