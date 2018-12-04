var fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n');

let countMap = {
    2:0,
    3:0
};
const countLetters = (code) => {
    let map = {};
    code.split('').forEach((letter) => {
        if (map[letter]) {
            map[letter]++;
        } else {
            map[letter] = 1;
        }
    });
    const counts = Object.values(map);
    const two = counts.includes(2);
    const three = counts.includes(3);
    return {
        two,
        three
    };
}

const result = input.reduce((ag, code) => {
    const counts = countLetters(code);
    if (counts.two) {
        ag.two++;
    }
    if (counts.three) {
        ag.three++;
    }
    return ag;
}, {
    two: 0,
    three: 0
});

console.log(result.two * result.three);