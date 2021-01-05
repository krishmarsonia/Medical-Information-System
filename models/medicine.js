const medicine = [];

module.exports = class Medicine{
    constructor(t){
        this.title = t;
        // console.log(this.title);
    }

    save(){
        medicine.push(this.title);
    }

    static fetchall(){
        return medicine;
    }
}