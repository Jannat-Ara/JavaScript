const event = require('events');
const emitter = new event();
const path = require('path');
const fs =require('fs');

emitter.on('backup',()=>{
    const data =JSON.parse(fs.readFileSync(path.join(__dirname,'data','manga.json'),'utf-8'));
    const backup =JSON.parse(fs.readFileSync(path.join(__dirname,'backup','manga.json'),'utf-8'));

    if(JSON.stringify(data)!== JSON.stringify(backup)){
        // console.log(data.length, backup.length);
        // console.log(`(Updated)Time:${new Date()}`);
        console.log(`(Updated) Date: ${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}  Time:${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`)
        const updatedBackup = JSON.stringify(data);
        fs.writeFileSync(path.join(__dirname,'backup','manga.json'),updatedBackup,'utf-8');

    }
    else {
        console.log(data.length, backup.length);
        console.log(`(No change)Time: ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`);
    }


});
setInterval(()=>{
    emitter.emit('backup');
},1000);
// emitter.emit('backup');