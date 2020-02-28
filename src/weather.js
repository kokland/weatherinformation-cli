const axios = require("axios");
const parser = require("xml2json-light");

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
    // console.log(report);

    console.log("Temperatur: ", report.temperature);
    console.log("Luftfuktighet", report.humidity);
    console.log("Vind: ", `${report.windSpeed} ${report.windDirection}`);
    console.log("Lufttrykk:", `${report.pressure} ${report.pressureUnit}`);
  }
};
