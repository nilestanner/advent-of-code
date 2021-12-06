const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8').split('\r\n').map((s) => {
  return parseInt(s, 10);
});

console.log(data);


const findNumberOfIncreasing = (input) => {
  return input.reduce((total, next, i) => {
    if (i === 0 || next <= input[i - 1]) {
      return total;
    }
    return total + 1;
  }, 0);
}

console.log(findNumberOfIncreasing(data));