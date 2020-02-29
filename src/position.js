const axios = require("axios");
const chalk = require("chalk");

module.exports = {
  getCurrentLocation: async () => {
    var res = await axios.get("https://get.geojs.io/v1/ip.json");
    console.log("Current ip:\n\t", chalk.green(res.data.ip));
    const ip = res.data.ip;

    var response = await axios.get(`https://get.geojs.io/v1/ip/geo/${ip}.json`);
    console.log(
      `Current location: \n\t${response.data.city}, ${response.data.country}`
    );

    return {
      countryName: response.data.country,
      city: response.data.city,
      lat: response.data.latitude,
      long: response.data.longitude
    };
  }
};
