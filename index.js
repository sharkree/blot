// check out the workshop tab to get started
// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 125;
const height = 125;
// check out the workshop tab to get started
// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const seed = 65336;
bt.setRandSeed(seed);

const width = 512;
const height = 512;

setDocDimensions(width, height);

const landOnLeft = true;

// store final lines here
const printLines = [];

let line = [];

line[0] = 96;
// Lower bound 64 upper bound 128

let divider = ~~((256 + 64 + ~~(bt.rand() * 64)) / 16);

for (let i = 1; i <= 32; i++) {
  if (line[i - 1] == 64) {
    let change = ~~(bt.rand() * 2); // either 0 or 1 round down
    change *= 8
    line.push(line[i - 1] + change);
  } else if (line[i - 1] == 128) {
    let change = ~~(bt.rand() * 2);
    change *= 8
    line.push(line[i - 1] - change);
  } else {
    let change = ~~(bt.rand() * 3);
    change -= 1;
    change *= 8
    line.push(line[i - 1] - change);
  }
}

let land = [];
let wave = [];

for (let i = 0; i <= 32; i++) {
  if (i < divider) {
    if (landOnLeft) {
      land.push([16 * i, line[i]]);
    } else {
      wave.push([16 * i, line[i]]);
    }
  } else {
    if (landOnLeft) {
      wave.push([16 * i, line[i]]);
    } else {
      land.push([16 * i, line[i]]);
    }
  }

  if (i == divider - 1) { // for continuity
    if (landOnLeft) {
      wave.push([16 * i, line[i]]);
    } else {
      land.push([16 * i, line[i]]);
    }
  }
}

console.log(land);
land = bt.catmullRom(land, 5);
console.log(land);
wave = bt.catmullRom(wave, 5);

if (landOnLeft) {
  land.unshift([0, 0]);
  wave.unshift([16 * (divider - 1), 0]);
} else {
  wave.unshift([0, 0]);
  land.unshift([16 * (divider - 1), 0]);
}

if (landOnLeft) {
  land.push([16 * (divider - 1), 0]);
  land.push([0, 0]);
  wave.push([512, 0]);
  wave.push([16 * (divider - 1), 0]);
} else {
  wave.push([16 * (divider - 1), 0]);
  wave.push([0, 0]);
  land.push([512, 0]);
  land.push([16 * (divider - 1), 0]);
}

// draw 
drawLines([land], {fill: "yellow", stroke: "yellow", width: 2});
drawLines([wave], {fill: "blue", stroke: "blue", width: 2});
setDocDimensions(width, height);

// store final lines here
const finalLines = [];

// create a polyline
const polyline = [
  [30, 90],
  [100, 90],
  [100, 30],
  [30, 30],
  [30, 90]
];

// add the polyline to the final lines
finalLines.push(polyline);

// transform lines using the toolkit
bt.rotate(finalLines, 45);

// draw it
drawLines(finalLines);
