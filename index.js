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
if (process.argv[2] === 'ask') {
    console.log('What color would you like to see?');
    console.log('What luminosity would you like to see?');
} else {
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
}