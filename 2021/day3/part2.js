const fs = require('fs');

const raw = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

const sums = Array(raw[0].length).fill(0).map(_ => 0);

const filterByIndex = (data, index, byMostCommon) => {
  const map = {};
  data.forEach((row) => {
    if (map[row[index]] == null) {
      map[row[index]] = [];
    }
    map[row[index]].push(row);
  });
  const onegtzero = map['1'].length >= map['0'].length;
  if (onegtzero && byMostCommon || !onegtzero && !byMostCommon) {
    return map['1'];
  } else {
    return map['0'];
  }
}

const getFiltered = (data, mostCommon) => {
  let index = 0;
  while (data.length > 1 && index < data[0].length) {
    data = filterByIndex(data, index, mostCommon);
    index++;
  }
  return data[0];
}

const oxy = parseInt(getFiltered(raw, true), 2);
const co2 = parseInt(getFiltered(raw, false), 2);

console.log(oxy, co2);
console.log(oxy * co2);
