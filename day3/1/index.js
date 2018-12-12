var fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n');

const extractCoords = (str) => {
    str = str.substring(0, str.length - 1);
    return str.split(',');
}

const fabric = {};

input.forEach((row) => {
    const parts = row.split(' ');
    const placement = parts[2];
    const size = parts[3];
    const [x, y] = extractCoords(placement).map((val) => parseInt(val, 10));
    const [w, h] = size.split('x').map((val) => parseInt(val, 10));
    Array(w).fill(1).forEach((n, wi) => {
        Array(h).fill(1).forEach((n, hi) => {
            const key = (x + wi) + '|' + (y + hi);
            if (fabric[key]) {
                fabric[key]++
            } else {
                fabric[key] = 1;
            }
        });
    });
});

const overlaps = Object.values(fabric).filter((val) => {
    return val > 1;
});

console.log(overlaps.length);