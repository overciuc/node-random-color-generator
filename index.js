// import the chalk, randmocolor libraries and generate random color and readline
const chalk = require('chalk');
const randomColor = require('randomcolor');
// eslint-disable-next-line unicorn/prefer-node-protocol
const readline = require('readline');

// make sure the argv2 is not undefined
let argv2;
if (process.argv[2]) {
  argv2 = process.argv[2];
}

let dimensions;
let hue;
let luminosity;

// check if there was an ask or dimensions given or other cases
let ask = false;

if (argv2 === 'ask') {
  ask = true;
} else {
  if (argv2 && argv2.includes('x')) {
    dimensions = process.argv[2];
    hue = process.argv[3];
    luminosity = process.argv[4];
  } else if (argv2) {
    hue = argv2;
    luminosity = process.argv[3];
  }
}

// random color will have a color and luminosity
const color = randomColor({
  luminosity: luminosity,
  hue: hue,
});

// check what feedback was written in the console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function printBun(bunHeight, bunColor, bunLine) {
  for (let i = 0; i < bunHeight; i++) {
    console.log(chalk.hex(bunColor).bold(bunLine));
  }
}

// displays the hash tag grid with an empty square in the middle with a display of color code.
function colorShow(printColor, printWidth, printHeight) {
  const bunLine = '#'.repeat(printWidth);
  const bunHeightDecimal = (printHeight - 3) / 2;
  const topBunHeight = Math.floor(bunHeightDecimal);
  const bottomBunHeight = Math.ceil(bunHeightDecimal);
  // top bun
  printBun(topBunHeight, printColor, bunLine);

  // patty to be put in the middle with the same empty box around the color name
  const pattyEmptyLine =
    '#'.repeat(Math.floor((printWidth - 14) / 2)) +
    ' '.repeat(14) +
    '#'.repeat(Math.ceil((printWidth - 14) / 2));
  console.log(chalk.hex(printColor).bold(pattyEmptyLine));

  const pattyColorLine =
    '#'.repeat(Math.floor((printWidth - 14) / 2)) +
    ' '.repeat(3) +
    printColor +
    ' '.repeat(4) +
    '#'.repeat(Math.ceil((printWidth - 14) / 2));
  console.log(chalk.hex(printColor).bold(pattyColorLine));

  console.log(chalk.hex(printColor).bold(pattyEmptyLine));

  // bottom bun
  printBun(bottomBunHeight, printColor, bunLine);
}

// default declaration of width and heaight of the grid.
let width = 31;
let height = 9;

// check if the dimensions were given through a console.
if (dimensions) {
  const dimensionsArray = dimensions.split('x');
  width = dimensionsArray[0];
  height = dimensionsArray[1];
  if (width < 16 || height < 5) {
    console.log('The dimensions of the block are too small!');
    process.exit();
  }
}

// check if there was an ask input given in the console and display questions, else display random color
if (ask) {
  rl.question('What color would you like to see? ', function (askedHue) {
    rl.question(
      'What luminosity would you like to see? ',
      function (askedLuminosity) {
        const askedColor = randomColor({
          luminosity: askedLuminosity,
          hue: askedHue,
        });
        colorShow(askedColor, width, height);
        rl.close();
      },
    );
  });
} else {
  colorShow(color, width, height);
  rl.close();
}

/* eslint-disable unicorn/prefer-node-protocol*/
/* eslint-disable no-shadow */
