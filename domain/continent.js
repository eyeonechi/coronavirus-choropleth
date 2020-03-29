class Continent {

  constructor (name) {
    this.name = name;
    this.cases = 0;
    this.todayCases = 0;
    this.deaths = 0;
    this.todayDeaths = 0;
    this.active = 0;
    this.recovered = 0;
    this.critical = 0;
    this.countries = {};
  }

  addCountry (country) {
    this.countries[country.name] = country;
    this.cases += country.cases;
    this.todayCases += country.todayCases;
    this.deaths += country.deaths;
    this.todayDeaths += country.todayDeaths;
    this.active += country.active;
    this.recovered += country.recovered;
    this.critical += country.critical;
  }

  getCountries () {
    return this.countries;
  }

  toFeatureCollection () {
    return {
      type: 'FeatureCollection',
      features: Object.values(this.countries).map((country) => country.toFeature())
    };
  }

}

module.exports = Continent;
