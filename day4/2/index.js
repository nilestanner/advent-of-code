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
let record = {
    id: 0,
    num: 0,
    minute: 99
}

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
                if (sleepMap[currentId].minutes[startMinute + i] > record.num) {
                    record.num = sleepMap[currentId].minutes[startMinute + i];
                    record.id = currentId;
                    record.minute = startMinute + i;
                }
            }
        });
    }
});

console.log(record.id, record.minute, record.id * record.minute);