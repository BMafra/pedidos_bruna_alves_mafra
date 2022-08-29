const express = require('express');
//porta entrada do server
const router = require('./router');
//bibliotecas instaladas dps parte logica
const app = express();
app.use(express.json());

app.use('/api', router); //vai entrar no router e procurar requisição 

app.listen(8080, () => {
    console.log('App listen on http://localhost:8080')
});