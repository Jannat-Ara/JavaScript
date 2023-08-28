const event = require('events');
const emitter = new event();
const path = require('path');
const fs = require('fs');

// Log file path
const logFilePath = path.join(__dirname, 'log', 'log.txt');
// History file path
// const historyFilePath = path.join(__dirname, 'history', 'history.txt');

// Function to write a log message to the log file
function writeLog(message) {
    const logMessage = `[${new Date()}] ${message}\n`;
    fs.appendFileSync(logFilePath, logMessage, 'utf-8');
}

emitter.on('backup', () => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'manga.json'), 'utf-8'));
    const backup = JSON.parse(fs.readFileSync(path.join(__dirname, 'backup', 'manga.json'), 'utf-8'));

    if (JSON.stringify(data) !== JSON.stringify(backup)) {
        const updatedBackup = JSON.stringify(data);
        fs.writeFileSync(path.join(__dirname, 'backup', 'manga.json'), updatedBackup, 'utf-8');

        const logMessage = `(Updated) Date: ${new Date().toISOString()}`;
        writeLog(logMessage);
    } else {
        // const logMessage = `(No change) Date: ${new Date().toISOString()}`;
        // writeLog(logMessage);
    }
});

setInterval(() => {
    emitter.emit('backup');
}, 1000);

// Log initial execution
const initialLogMessage = `Script started at ${new Date().toISOString()}`;
writeLog(initialLogMessage);