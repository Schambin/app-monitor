import fs  from 'fs';
import activeWindow from 'active-win';


let current = '';
let start = Date.now();
const logFile = 'log.json';
const data = {};

setInterval(async () => {
    const app = await activeWindow();
    const name = app?.owner?.name;

    if(name !== current) {
        
        const now = Date.now();
        const time = (now - start) / 1000;
        
        if(current) {
            if(!data[current]) data[current] = 0;
            data[current] += time;
            fs.writeFileSync(logFile, JSON.stringify(data, null, 2));
        }

        current = name;
        start = now;
    }
}, 1000);