const fs = require('fs');

const raw = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

const sums = Array(raw[0].length).fill(0).map(_ => 0);

raw.forEach((r) => {
  const bits = r.split('');
  bits.forEach((b, i) => {
    if (b === '1') {
      sums[i]++;
    }
  });
});

const gamma = parseInt(sums.map((b) => b > (raw.length / 2) ? 1 : 0).join(''), 2);
const epsilon = parseInt(sums.map((b) => b > (raw.length / 2)  ? 0 : 1).join(''), 2);

console.log(gamma, epsilon);
console.log(gamma * epsilon);
