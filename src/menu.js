const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

module.exports = {
    printHeaderText: async () => {

        await clear();
        await console.log(
            chalk.green(figlet.textSync("Weather-CLI", { horizontalLayout: "fitted" }))
        );
    }
}