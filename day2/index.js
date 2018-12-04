var fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n');
let exit = false;
let i = 0;
let map = {0:1};
let currentFreq = 0;
while(!exit) {
    currentFreq += parseInt(input[i], 10);
    if (map[currentFreq]) {
        map[currentFreq]++;
    } else {
        map[currentFreq] = 1;
    }
    if (map[currentFreq] > 1) {
        exit = true;
    }
    i++;
    if (i === input.length){
        i = 0;
    }
}
console.log(currentFreq);