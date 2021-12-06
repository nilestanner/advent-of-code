const fs = require('fs');

const raw = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

let horizontal = 0;
let depth = 0;

raw.forEach((c) => {
  const parts = c.split(' ');
  const command = parts[0];
  const amount = parseInt(parts[1]);
  switch (command) {
    case 'forward':
      horizontal = horizontal + amount;
      break;
    case 'down':
      depth = depth + amount;
      break;
    case 'up':
      depth = depth - amount;
      break;
  }
});
console.log(horizontal, depth);
console.log(horizontal * depth);