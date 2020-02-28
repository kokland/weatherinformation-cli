const axios = require("axios");
const parser = require("xml2json-light");
const beaufort = require('beaufort-scale');

module.exports = {
  getWeather: async (lat, long) => {
    const url = `https://api.met.no/weatherapi/locationforecastlts/1.3/?lat=${lat}&lon=${long}`;
    var response = await axios.get(url);
    const weatherReport = parser.xml2json(response.data).weatherdata.product;

    const current = weatherReport.time[0];

    const report = {
      windSpeed: current.location.windSpeed.name,
      windDirection: current.location.windDirection.name,
      humidity: current.location.humidity.value,
      temperature: current.location.temperature.value,
      pressure: current.location.pressure.value,
      pressureUnit: current.location.pressure.unit
    };

    const beaufortScale = beaufort(current.location.windSpeed.beaufort * 3.6, { lang: 'en' });

    console.log("---");
    console.log("Temperature (C): \t", report.temperature);
    console.log("Humidity:\t\t", report.humidity);
    console.log("Wind:\t\t\t", `${beaufortScale.desc} ${report.windDirection}`);
    console.log("Pressure:\t\t", `${report.pressure} ${report.pressureUnit}`);
    console.log("---");
  }
};
