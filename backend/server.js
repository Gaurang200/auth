const express = require("express");
const dotenv = require("dotenv");
dotenv.config(); 
const cors = require("cors");
const api = require("./src/routes/index")

require("./src/config/db")

const app = express();

app.use(express.json())
   
app.use(cors({origin:"*"}))

app.use('/', api);

const port = process.env.PORT || 5000;
const nodeEnv = process.env.NODE_ENV || 'production';


app.listen(port,()=>{
    console.log(`server is running on ${port} and ${nodeEnv} mode `);
    
})


