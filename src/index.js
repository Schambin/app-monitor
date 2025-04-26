import activeWindow from 'active-win';
import DatabaseService from './db/database.js';

let current = 'Unknown';
let start = Date.now();

const Database = new DatabaseService();

/* function exportToExcel() {
    try {
        const log = loadLog();

        const today = getTodayDate();
        const todayLog = log.logs.find((entry: any) => entry.date === today);

        if (!todayLog) {
            console.log("Nenhum log encontrado na data de hoje.");
            return;
        }

        const data = todayLog.activities.map((activity: any) => ({
            Aplicativo: activity.name,
            'Tempo de uso(segundos) ': activity.timeInSeconds,
            'Último uso': activity.lastTimeUsed,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Relatório');
        XLSX.writeFile(workbook, `relatorio-${today}.xlsx`);
    } catch (error) {
        console.error(error);
    }
}

function exportToCSV() {
    try {
        const log = loadLog();

        const headers = ['date', 'app', 'timeInSeconds', 'lastTimeUsed'];
        const rows = [headers.join(',')];

        log.logs.forEach((entry: any) => {
            entry.activities.forEach((activity: any) => {
                const line = [
                    entry.date,
                    `"${activity.name}"`,
                    activity.timeInSeconds,
                    activity.lastTimeUsed,
                ];
                rows.push(line.join(','));
            });
        });

        const csvContent = rows.join('\n');
        fs.writeFileSync('report.csv', csvContent);
        console.log("Log exportados para csv");
    } catch (error) {
        console.error(error);
    }
} */

function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}

function startMonitoring() {
    console.log("App Running...");

    Database.init();

    setInterval(async () => {
        const app = await activeWindow();
        const name = app?.owner?.name ?? 'Unknown';

        const now = Date.now() - 4;
        const time = Math.floor((now - start) / 1000);
        start = now;

        const date = getTodayDate();

        const activity = {
            date,
            name,
            timeInSeconds: 0,
            lastTimeUsed: new Date(now).toISOString()
        };

        activity.timeInSeconds += time;
        activity.lastTimeUsed = new Date(now).toISOString();
        Database.insertOrUpdate(activity);
        current = name;

        /* setInterval(() => {
            const used = process.memoryUsage();
            console.log(`Memória Usada: ${(used.rss / 1024 / 1024).toFixed(2)}MB`);
        }, 5000); */

    }, 5000);
}

startMonitoring();