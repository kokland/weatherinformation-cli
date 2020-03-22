const axios = require("axios");
const format = require("date-fns/format");
const addDays = require("date-fns/addDays");
const isAfter = require("date-fns/isAfter");
const parser = require("xml2json-light");
const chalk = require("chalk");

module.exports = {
  getTidevann: async (latitude, longitude) => {
    const now = new Date();
    const fromtime = format(now, "yyyy-MM-dd");
    const totime = format(addDays(now, 3), "yyyy-MM-dd");

    const url = `https://api.sehavniva.no/tideapi.php?lat=${latitude}&lon=${longitude}&fromtime=${fromtime}&totime=${totime}&datatype=tab&refcode=cd&place=&file=&lang=en&interval=10&dst=0&tzone=&tide_request=locationdata`;
    var response = await axios.get(url);
    const json = parser.xml2json(response.data);
    printHighLow(json.tide.locationdata.data);
  }
};

printHighLow = data => {
  console.log("Tidal water details:");
  data.waterlevel.map(row => {
    var now = new Date();
    var timestamp = new Date(row.time);

    if (isAfter(timestamp, now)) {
      var date = format(new Date(row.time), "dd.MM.yyyy HH:mm");
      print(date, row.value, row.flag);
    }
  });
};

print = (date, value, flag) => {
  const color = flag == "low" ? chalk.yellow(flag) : chalk.green(flag);
  console.log(`\t${date} | ${color}\t| ${value}cm`);
};
