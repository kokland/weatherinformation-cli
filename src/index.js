#!/usr/bin/env node
const position = require("./position");
const weather = require("./weather");
const tidevann = require("./tidevann");
const menu = require('./menu');

menu.printHeaderText();

position.getCurrentLocation().then(async ({ lat, long }) => {
  await weather.getWeather(lat, long);
  await tidevann.getTidevann(lat, long);
  console.log("");
  console.log("");
});
