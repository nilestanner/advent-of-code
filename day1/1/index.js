var fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const total = input.split('\n').reduce((a, b) => {
    return parseInt(a ,10) + parseInt(b, 10);
}, 0);
console.log(total);