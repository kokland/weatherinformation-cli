const axios = require("axios");

module.exports = {
  getCurrentIp: async () => {
    var response = await axios.get("https://api.ipify.org?format=json");
    console.log(`Current IP: ${response.data.ip}`);
    return response.data.ip;
  },
  getCurrentLocation: async ip => {
    var response = await axios.get(`https://get.geojs.io/v1/ip/geo/${ip}.json`);
    return {
      city: response.data.city,
      lat: response.data.latitude,
      long: response.data.longitude
    };
  }
};
