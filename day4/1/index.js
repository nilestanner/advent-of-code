const fs = require('fs');
const moment = require('moment');

const input = fs.readFileSync('input.txt', 'utf8').split('\n');

const formated = input.map((row) => {
    const parts = row.split(']');
    const time = moment(parts[0], '[YYYY-MM-DD hh:mm');
    const event = parts[1];
    return {
        time,
        event
    };
}).sort((a, b) => {
    return moment.utc(a.time).diff(moment.utc(b.time))
});

let currentId = 0;
let sleepMap = {};
let startSleep = null;

formated.forEach(obj => {
    if (obj.event.includes('begins')) {
        currentId = obj.event.match(/#[0-9]+/)[0].substr(1);
    }
    if (obj.event.includes('asleep')) {
        startSleep = obj.time;
    }
    if(obj.event.includes('wakes')) {
        if (!sleepMap[currentId]) {
            sleepMap[currentId] = {
                total: 0,
                minutes: {}
            };
        }
        const minutesAsleep = Math.ceil(moment.duration(obj.time.diff(startSleep)).asMinutes());
        sleepMap[currentId].total += minutesAsleep
        const startMinute = parseInt(startSleep.format('mm'), 10);
        Array(minutesAsleep).fill(1).forEach((x, i) => {
            if (!sleepMap[currentId].minutes[startMinute + i]) {
                sleepMap[currentId].minutes[startMinute + i] = 1;
            } else {
                sleepMap[currentId].minutes[startMinute + i]++;
            }
        });
    }
});

const sleepArray = Object.keys(sleepMap).map((key) => {
    sleepMap[key].id = key;
    return sleepMap[key];
});

;

const laziestGaurd = sleepArray.sort((a, b) => {
    return b.total - a.total; 
})[0].id;

console.log(laziestGaurd);

const laziestMinute = Object.keys(sleepMap[laziestGaurd].minutes).map((minute) => {
    return {
        minute,
        total: sleepMap[laziestGaurd].minutes[minute]
    };
}).sort((a, b) => {
    return b.total - a.total; 
})[0].minute;

console.log(laziestMinute);

console.log(laziestGaurd * laziestMinute);