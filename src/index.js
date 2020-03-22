#!/usr/bin/env node
const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const position = require("./position");
const weather = require("./weather");
const tidevann = require("./tidevann");
clear();
console.log(
  chalk.green(figlet.textSync("Weather-CLI", { horizontalLayout: "fitted" }))
);

position.getCurrentLocation().then(async ({ lat, long }) => {
  await weather.getWeather(lat, long);
  await tidevann.getTidevann(lat, long);
  console.log("");
  console.log("");
});
