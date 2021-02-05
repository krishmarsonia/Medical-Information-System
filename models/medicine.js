// const medicine = [];
const fs = require('fs');
const path = require('path');

module.exports = class Medicine{
    constructor(t){
        this.title = t;
        // console.log(this.title);
    }

    save(){
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'medicine.json');
        // medicine.push(this.title);
        fs.readFile(p, (err, fileContent) => {
            let medicine = [];
            if (!err){
                medicine = JSON.parse(fileContent);
            }
            medicine.push(this);
            fs.writeFile(p, JSON.stringify(medicine), (err) => {
                console.log(err);
            });
        });
    }

    static fetchall(cb){
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'medicine.json');
        fs.readFile(p, (err, fileContent) => {
            if(err){
                cb([]);
            }
            cb(JSON.parse(fileContent));
        })
    }
}