const express = require('express');
const bodyParser = require('body-parser');
const { Pool, Client } = require('pg');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

const connectionString = 'postgresql://joshua:O0nUO5XDUlLJ-YjBn-Mtfw@swamp-manta-5267.6wr.cockroachlabs.cloud:26257/interestfields?sslmode=verify-full'
 
const pool = new Pool({
  connectionString,
})

app.use(bodyParser.urlencoded({ extended: false }));
 
app.get('/insert', function(req, res) {
  var sql = {
    username: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  };

  pool.query('INSERT INTO interestfields SET ?', sql, (err, res) => {
    console.log(err, res)
    pool.end()
  })
  res.redirect('/')
})
 
const client = new Client({
  connectionString,
})
client.connect()
 
client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});