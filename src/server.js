var express = require('express');
var app = express();
var fetch = require('node-fetch');
var csv = require('csvtojson');
var fs = require('fs');
var Country = require('../domain/country.js');

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Server listening at http://%s:%s", host, port)
});

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  // csv()
  // .fromFile('data/MERS.csv')
  // .then((mers) => {
  //   csv()
  //   .fromFile('data/SARS.csv')
  //   .then((sars) => {
      fetch(
        'https://corona.lmao.ninja/countries',
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      ).then(res => res.json())
      .then(covid19Countries => {
        
        let countries = {};
        let geojson = JSON.parse(fs.readFileSync('data/medium.countries.geo.json', 'utf8'));

        geojson.features.map((element) => {
          if (element.properties.name_long === 'United States') {
            element.properties.name_long = 'USA';
          } else if (element.properties.name_long === 'United Kingdom') {
            element.properties.name_long = 'UK';
          } else if (element.properties.name_long === 'United Arab Emirates') {
            element.properties.name_long = 'UAE';
          } else if (element.properties.name_long === 'Czech Republic') {
            element.properties.name_long = 'Czechia';
          } else if (element.properties.name_long === 'Bosnia and Herzegovina') {
            element.properties.name_long = 'Bosnia';
          } else if (element.properties.name_long === 'Dem. Rep. Korea') {
            element.properties.name_long = 'N. Korea';
          } else if (element.properties.name_long === 'Republic of Korea') {
            element.properties.name_long = 'S. Korea';
          } else if (element.properties.name_long === 'Lao PDR') {
            element.properties.name_long = 'Laos';
          } else if (element.properties.name_long === 'Russian Federation') {
            element.properties.name_long = 'Russia';
          } else if (element.properties.name_long === 'Brunei Darussalam') {
            element.properties.name_long = 'Brunei';
          }
          countries[element.properties.name_long.toLowerCase()] = new Country(
            element.properties.name_long,
            element.geometry
          )
        });

        // let covid19Countries = JSON.parse(fs.readFileSync('data/countries.json', 'utf8'));
        covid19Countries.map((element) => {
          if (element.country === 'Bosnia and Herzegovina') {
            element.country = 'Bosnia';
          }
          if (countries[element.country.toLowerCase()]) {
            countries[element.country.toLowerCase()].cases = element.cases;
            countries[element.country.toLowerCase()].todayCases = element.todayCases;
            countries[element.country.toLowerCase()].deaths = element.deaths;
            countries[element.country.toLowerCase()].todayDeaths = element.todayDeaths;
            countries[element.country.toLowerCase()].recovered = element.recovered;
            countries[element.country.toLowerCase()].active = element.active;
            countries[element.country.toLowerCase()].critical = element.critical;
            countries[element.country.toLowerCase()].casesPerOneMillion = element.casesPerOneMillion;
            countries[element.country.toLowerCase()].deathsPerOneMillion = element.deathsPerOneMillion;
          }
        });

        // let covid19Historical = JSON.parse(fs.readFileSync('data/historical.json', 'utf8'));
        // covid19Historical.map((element) => {
        //   if (countries[element.country.toLowerCase()]) {
        //     if (element.province) {

        //     } else {
        //       countries[element.country.toLowerCase()].timeline = element.timeline;
        //     }
        //   }
        // });

        let covid19 = {
          type: 'FeatureCollection',
          features: Object.values(countries).map((country) => country.toFeature())
        };

        // fs.writeFileSync('data/covid19.json', JSON.stringify(covid19));

        res.render('index', {
          covid19: JSON.stringify(covid19),
          // sars: JSON.stringify(sars),
          // mers: JSON.stringify(mers)
        });

      })
      .catch(err => {
        console.error(err);
        res.render('Unable to fetch latest data');
      });
  //   });
  // });
});
