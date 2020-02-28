const axios = require("axios");

module.exports = {
  getCurrentIp: async () => {
    var response = await axios.get("https://api.ipify.org?format=json");
    console.log(`Using current IP: ${response.data.ip}`);
    console.log("");
    return response.data.ip;
  },
  getCurrentLocation: async ip => {
    var response = await axios.get(`https://get.geojs.io/v1/ip/geo/${ip}.json`);
    return {
      countryName: response.data.country,
      city: response.data.city,
      lat: response.data.latitude,
      long: response.data.longitude
    };
  }
};
