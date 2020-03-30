# coronavirus-choropleth
A Choropleth map showcasing the spread of Covid-19 across the globe
* This application is developed as an entry to the [COVID-19 Global Hackathon](https://covid-global-hackathon.devpost.com/)
* Note: Might take awhile to load on Heroku

## Inspiration
After hearing about the global pandemic, as well as the flurry of news updates on the topic, I was inspired to build something that would present updated data in an accessible, easy-to-use, and visual manner.
## What it does
This app fetches Covid-19 data from the [NovelCOVID API](https://github.com/novelcovid/api) and stitches it together with a geojson file obtained from [GeoJSON Maps of the globe](https://geojson-maps.ash.ms/) to display an interactive colored map (choropleth map) of the world based on statistics such as number of cases, deaths, and recoveries.
## How I built it
#### Backend (Node, Express)
Upon receiving a request, the server parses the geojson map, extracting necessary details about a country such as it's name, continent, and polygon geometry. The server then fetches data from the API endpoints and combines this with their respective countries, taking care to match countries written with different names. This combined data is then organised into continents, which group their countries into geojson feature collections.The names of each continent is injected into the frontend via EJS variables.
#### Frontend (Leaflet, HTML, CSS, AJAX)
Once loaded, the website loads the Leaflet map canvas and initiates AJAX calls to the backend to concurrently load different continents (instead of the entire world) as different layers on the map. Each country is drawn and polyfilled with a color respective to a particular statistic (cases, deaths, recovered) of that country, which is toggled by a button on the top left. The color legend and information boxes are then updated when a user hovers or taps on a country.
## Challenges I ran into
* Where and how to find updated data on Covid-19.
* Low resolution maps did not have polygons for smaller countries (e.g. Singapore, Hong Kong).
* Larger resolution maps took too long to load on Heroku, occasionally timed out.
* Names of many countries did not match between the API and the geojson file.
* Displaying a loading icon while continents download asynchronously.
* Map touch events clashed with scroll events and did not fire on mobile browsers.
* Updating colors of countries on the map when cycling through different data displays
## Accomplishments that I'm proud of
I have always been interested in spatial visualizations and cartography, but never had the time or chance to explore further during my university life. Building this application allowed me to understand the logic behind how digital maps are made and delve into some data processing and optimization techniques.
## What I learned
* How countries are drawn as polygons on digital maps.
* A trade off between map quality and loading times.
* Asynchronous loading of data and layers on a canvas.
* Differences between the various touch and pointer events in a website.
* How to handle cross origin requests.
* Debugging network requests through the browser development console.
* The names of many other countries I did not know about.
* More ways to use Markdown after writing this.
## What's next for Coronavirus Choropleth
After learning how to load and replace multiple layers asynchronously, I plan to extend this app to visualize Covid-19 statistics based on states in a country, when zoomed into. I would also like to display a slider which would allow visualizing the spread of the virus across different days, and maybe include data on other pandemics to compare against.
## How to run it
* Clone the repository
```
git clone https://github.com/eyeonechi/coronavirus-choropleth
cd coronavirus-choropleth
```
* Install dependencies
```
yarn install
```
* Execute the program
```
yarn start
```
* Open the [webpage](http://localhost:3000/) in your browser
