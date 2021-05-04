const luminosity = process.argv[3];
const hue = process.argv[2];

const chalk = require('chalk');
const randomColor = require('randomcolor');

const color = randomColor({
    luminosity: luminosity,
    hue: hue,
});

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function colorShow(color) {
    const hashTagsGrid = `    ##############################
    ##############################
    ##############################
    ########              ########
    ########   ${color}    ########
    ########              ########
    ##############################
    ##############################
    ##############################`;
    console.log(chalk.hex(color).bold(hashTagsGrid));
}

if (process.argv[2] === 'ask') {
    rl.question('What color would you like to see ? ', function(hue) {
        rl.question(
            'What luminosity would you like to see ? ',
            function(luminosity) {
                const askedColor = randomColor({
                    luminosity: luminosity,
                    hue: hue,
                });
                colorShow(askedColor);
                rl.close();
            },
        );
    });
} else {
    colorShow(color);
    rl.close();
}