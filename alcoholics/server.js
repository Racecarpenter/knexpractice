var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;
var cors = require('cors');
var logger = require('morgan');
var knex = require('./db/knex');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', function(req, res) {
  res.render('index', {
    title: 'DBConfig'
  });
})

app.get('/booze', function(req, res) {
  knex.raw(`select * from booze_types`).then(function(booze_types) {
    res.send(booze_types.rows);
  })
})

app.get('/booze/:id', function(req, res) {
  knex.raw(`select * from booze_types where id=${req.params.id}`).then(function(booze_types) {
    res.send(booze_types.rows);
  })
})

app.post('/booze', function(req, res) {
  knex.raw(`insert into booze_types(type, alcohol_percentage, country) values('${req.body.type}', ${req.body.alcohol_percentage}, '${req.body.country}')`).then(function() {
    knex.raw(`select * from booze_types`).then(function(booze_types) {
      res.send(booze_types.rows);
    })
  })
})

app.put('/booze/:id', function(req, res) {
  knex.raw(`update booze_types set type= '${req.body.type}', alcohol_percentage= '${req.body.alcohol_percentage}', country= '${req.body.country}' where id=${req.params.id}`).then(function() {
    knex.raw(`select * from booze_types`).then(function(booze_types) {
      res.send(booze_types.rows);
    })
  })
})

app.delete('/booze/:id', function(req, res) {
  knex.raw(`delete from booze_types where id = ${req.params.id}`).then(function() {
    knex.raw(`select * from booze_types`).then(function(booze_types) {
      res.send(booze_types.rows);
    })
  })
})



app.listen(port, function() {
  console.log("listening on port: ", port);
})
