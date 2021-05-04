const luminosity = process.argv[3];
const hue = process.argv[2];

const chalk = require('chalk');
const randomColor = require('randomcolor');

const color = randomColor({
    luminosity: luminosity,
    hue: hue,
});

function colorShow(str) {
    console.log(chalk.hex(color).bold(str));
}

colorShow(
    `##############################
##############################
##############################
########              ########
########   ${color}    ########
########              ########
##############################
##############################
##############################`,
);