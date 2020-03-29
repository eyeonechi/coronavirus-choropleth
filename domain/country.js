class Country {

  constructor (name, continent, geometry) {
    this.name = name;
    this.continent = continent;
    this.geometry = geometry;
    this.cases = 0;
    this.todayCases = 0;
    this.deaths = 0;
    this.todayDeaths = 0;
    this.active = 0;
    this.recovered = 0;
    this.critical = 0;
    this.casesPerOneMillion = 0;
    this.deathsPerOneMillion = 0;
  }

  toFeature () {
    return {
      type: 'Feature',
      properties: {
        name: this.name,
        type: 'country',
        cases: this.cases,
        todayCases: this.todayCases,
        deaths: this.deaths,
        todayDeaths: this.todayDeaths,
        active: this.active,
        recovered: this.recovered,
        critical: this.critical,
        casesPerOneMillion: this.casesPerOneMillion,
        deathsPerOneMillion: this.deathsPerOneMillion
      },
      geometry: this.geometry
    };
  }

}

module.exports = Country;
