const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');


const app = express();
const router = express.Router();

//conexão do banco
mongoose.connect(config.connectionString, {useNewUrlParser: true, useUnifiedTopology: true})
.then (() => console.log ('Conexão com o banco de dados bem-sucedida !!'))
.catch (err => console.error (err));;

//Carregar os modelos
const Produto = require('./models/produto');

//app.listen(2000);

const indexRoute = require('./routes/index-route');
const produtosRoute = require('./routes/produto-route');

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: false}));


//habilita o cors
app.use(function (req, res, next) {
    res.header('Acess-Control-Allow-Origin', '*');
    res.header('Acess-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Tpe, Accept, X-access-token');
    res.header('Acess-Control-Allow-Methods', 'GET, POST, PUTE, DELETE, OPTIONS');
    next();
})



app.use('/', indexRoute);
app.use('/produtos', produtosRoute);


module.export = app;