var express = require('express');
var app = express();
var fetch = require('node-fetch');

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Server listening at http://%s:%s", host, port)
})

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  fetch(
    'https://corona.lmao.ninja/countries',
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  ).then(res => res.json())
  .then(data => {
    res.render('index', {cases: JSON.stringify(data)});
  })
  .catch(err => {
    console.error(err);
    res.render('Unable to fetch latest data');
  });
});
