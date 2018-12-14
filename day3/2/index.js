var fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n');

const extractCoords = (str) => {
    str = str.substring(0, str.length - 1);
    return str.split(',');
}

const fabric = {};
const intact = {};

input.forEach((row) => {
    const parts = row.split(' ');
    const placement = parts[2];
    const size = parts[3];
    const [x, y] = extractCoords(placement).map((val) => parseInt(val, 10));
    const [w, h] = size.split('x').map((val) => parseInt(val, 10));
    const id = parts[0].substring(1, parts[0].length);
    intact[id] = true;
    Array(w).fill(1).forEach((n, wi) => {
        Array(h).fill(1).forEach((n, hi) => {
            const key = (x + wi) + '|' + (y + hi);
            if (fabric[key]) {
                intact[fabric[key]] = false;
                intact[id] = false;
            } else {
                fabric[key] = id;
            }
        });
    });
});

console.log(Object.keys(intact).filter((key) => {
    return intact[key];
}));