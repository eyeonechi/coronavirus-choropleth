var express = require('express');
var app = express();
var fetch = require('node-fetch');
var csv = require('csvtojson');
var fs = require('fs');

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Server listening at http://%s:%s", host, port)
});

var data = JSON.parse(fs.readFileSync('data/countries.geo.json', 'utf8'));

app.use(express.static('public'));

app.set('view engine', 'ejs');

function matchCountry(name, cases) {
  for (let i = 0; i < cases.length; i ++) {
    if (cases[i].country === 'USA' && name === 'United States') {
      return cases[i];
    } else if (cases[i].country === 'UK' && name === 'United Kingdom') {
      return cases[i];
    } else if (cases[i].country === 'UAE' && name === 'United Arab Emirates') {
      return cases[i];
    } else if (cases[i].country === 'Czechia' && name === 'Czech Rep.') {
      return cases[i];
    } else if (cases[i].country === 'Bosnia and Herzegovina' && name === 'Bosnia and Herz.') {
      return cases[i];
    } else if (cases[i].country === 'N. Korea' && name === 'Dem. Rep. Korea') {
      return cases[i];
    } else if (cases[i].country === 'S. Korea' && name === 'Korea') {
      return cases[i];
    } else if (cases[i].country === 'Laos' && name === 'Lao PDR') {
      return cases[i];
    } else if (cases[i].country === 'Dominican Republic' && name === 'Dominican Rep.') {
      return cases[i];
    } else if (cases[i].country === name) {
      return cases[i];
    }
  }
  return null;
}

app.get('/', function (req, res) {
  // csv()
  // .fromFile('data/MERS.csv')
  // .then((data) => {
  //   res.render('index', {cases: JSON.stringify(data)});
  // });

  fetch(
    'https://corona.lmao.ninja/countries',
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  ).then(res => res.json())
  .then(cases => {

    for (let j = 0; j < data.features.length; j ++) {
      data.features[j].properties.cases = 0;
      data.features[j].properties.todayCases = 0;
      data.features[j].properties.deaths = 0;
      data.features[j].properties.todayDeaths = 0;
      data.features[j].properties.recovered = 0;
      data.features[j].properties.critical = 0;
      let match = matchCountry(data.features[j].properties.name, cases);
      if (match !== null) {
        data.features[j].properties.cases = match.cases;
        data.features[j].properties.todayCases = match.todayCases;
        data.features[j].properties.deaths = match.deaths;
        data.features[j].properties.todayDeaths = match.todayDeaths;
        data.features[j].properties.recovered = match.recovered;
        data.features[j].properties.critical = match.critical;
      }
      // else {
      //   console.log(data.features[j].properties.name);
      // }
    }

    res.render('index', {data: JSON.stringify(data)});
  })
  .catch(err => {
    console.error(err);
    res.render('Unable to fetch latest data');
  });
});
