var express = require('express');
var app = express();
var fetch = require('node-fetch');
var csv = require('csvtojson');

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Server listening at http://%s:%s", host, port)
});

// var data = JSON.parse(fs.readFileSync('data/countries.geo.json', 'utf8'));

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  csv()
  .fromFile('data/MERS.csv')
  .then((mers) => {
    csv()
    .fromFile('data/SARS.csv')
    .then((sars) => {
      fetch(
        'https://corona.lmao.ninja/countries',
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      ).then(res => res.json())
      .then(covid19 => {
        res.render('index', {
          covid19: JSON.stringify(covid19),
          sars: JSON.stringify(sars),
          mers: JSON.stringify(mers)
        });
      })
      .catch(err => {
        console.error(err);
        res.render('Unable to fetch latest data');
      });
    });
  });
});
