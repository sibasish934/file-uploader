const express = require("express");
const path = require('path');
const cors =require("cors");
const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.get('/', (req, res) => {
    res.send({text: 'CORS solved'})
  })
  
const fileRoutes = require('./routes/fileUploaderRouter')

app.use('/api', fileRoutes.routes);

const bodyParser = require("body-parser")

require('./database')();

const port = process.env.PORT || 8080;

app.use(bodyParser.json());


app.use('/uploads', express.static(path.join(__dirname,'uploads')));


app.listen(port, ()=>{
    console.log(`the server is listening at port ${port}`)
})