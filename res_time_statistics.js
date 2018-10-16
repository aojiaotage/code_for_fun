const readline = require('readline');

const MAX_MILLS = 120000;
const RATIOS = [0.9, 0.95, 0.99];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let total = 0.0;

const a = new Array(MAX_MILLS).fill(0);

function add(mills) {
  total += 1;
  a[mills] += 1.0;
}

function calOnEnd() {
  const edges = [];
  for (let i = 0; i < RATIOS.length; i += 1) {
    edges.push(Math.ceil(total * RATIOS[i]));
  }

  let t = 0;
  const results = [];
  for (let i = 0; i < a.length; i += 1) {
    t += a[i];
    for (let j = 0; j < edges.length; j += 1) {
      if (!results[j] && t >= edges[j]) results[j] = i;
    }
  }

  for (let i = 0; i < RATIOS.length; i += 1) {
    console.log(
      `${RATIOS[i] * 100}% of requests return a response in ${results[i]} ms`);
  }
}

rl.on('line', (line) => {
  const mills = Number(line);
  add(mills);
});

rl.on('close', () => {
  calOnEnd();
});

