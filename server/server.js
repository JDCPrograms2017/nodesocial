const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const password = "YnmlovM0RL_fUqHVHF8Xfw";

const app = express();
const port = 3000;

// Create a connection to the CockroachDB cluster
const client = new Client({
  user: 'joshua',
  host: 'node-social-5261.6wr.cockroachlabs.cloud',
  database: 'interestfields',
  port: 26257,
  ssl: {
    ca: '$HOME/.postgresql/root.crt'
  }
});

// Connect to the database
client.connect();

// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Handle the POST request to insert data into the database
app.post('/insert', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;

  client.query('INSERT INTO mytable (name, email, phone) VALUES ($1, $2, $3)', [name, email, phone])
    .then(result => {
      console.log(result.rowCount + ' rows inserted');
      res.redirect('/');
    })
    .catch(err => {
      console.error('Insert error', err);
      res.status(500).send('Insert error');
    });
});

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});