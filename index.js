const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config({ path: 'variables.env' });
//cors permite que un cliente se conecte a otro servidor para el intercambio de recursos
const cors = require('cors');

//connect to mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL).then(() => {
    console.log('DB is connected');
}).catch(err => {
    console.log(err);
});

//create server
const app = express();


//enable bodyparser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// definir un dominio(s) para recibir las peticiones
//const whiteList = ['http://localhost:5173'];
const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: (origin, callback) => {
        //revisar si la peticion viene de un servidor que esta en la whiteList
        const existe = whiteList.some(dominio => dominio === origin);
        if (existe) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}

//enable cors
app.use(cors(corsOptions));

//router app
app.use('/', routes());

//carpeta publica
app.use(express.static('uploads'));

//port
/*app.listen(4000, () => {
    console.log('Server is running on port 4000');
});*/

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

//iniciar app
app.listen(port, host, () => {
    console.log('Server is running on port 4000');
});