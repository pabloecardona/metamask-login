const { request } = require("express");
const express = require("express");
const app = express();

//importamos CORS
const cors = require("cors");

let account = {
  number: '123',
  balance:'10'
}

//utilizamos cors, permitiendo el acceso a la API desde cualquier origen
app.use(cors());

app.use(express.json());

app.post('/api/accounts', (request, response) => {
  const newAccount = request.body

  //validar si address y/o balance están vacíos

  account = {
    number: newAccount.number,
    balance: newAccount.balance
  }

  console.log(account);
  response.status(201).json(account)
})
//definimos el número de puerto para que lo tome de la variable de entorno
//en caso de no existir la variable de entorno entonces le asigna el 3001
const PORT = 3001;

//guardamos la información del servidor que se creó, para cerrar la conexión luego
//de realizar los tests
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});