class Country {

  // name = '';
  // geometry = '';
  // cases = 0;
  // deaths = 0;
  // timeline = null;

  constructor (name, geometry, cases) {
    this.name = name;
    this.geometry = geometry;
    this.cases = cases;
    this.timeline = {};
  }

  toFeature () {
    return {
      type: 'Feature',
      properties: {
        name: this.name,
        type: 'country',
        cases: this.cases,
        deaths: this.deaths
      },
      geometry: this.geometry
    };
  }

}

module.exports = Country;
