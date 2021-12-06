const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8').split('\r\n').map((s) => {
  return parseInt(s, 10);
});

const windowed = data.map((_, i) => {
  if (i + 2 >= data.length ) {
    return null;
  } else {
    return data[i] + data[i + 1] + data[i + 2];
  }
}).filter(v => v != null);


const findNumberOfIncreasing = (input) => {
  return input.reduce((total, next, i) => {
    if (i === 0 || next <= input[i - 1]) {
      return total;
    }
    return total + 1;
  }, 0);
}

console.log(findNumberOfIncreasing(windowed));