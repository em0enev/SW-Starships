export default class Starship {
    constructor(name, consumables, passengers) {
        this.name = name;
        this._consumables = this._parseConsumablesData(consumables);
        this._passengers = this._parsePassengerData(passengers);
    }

    _parseConsumablesData(data){
        const splitted = data.split(" ");
        const parsedData = Number(splitted[0]) * MULTIPLY[`${splitted[1]}`]
        return parsedData
    }

    _parsePassengerData(data){
        return data.replace(',','')
    }

    get maxDaysInSpace(){
        return this._consumables / this._passengers
    }
}

const MULTIPLY = {
    'days': 1,
    'months': 30,
    'month': 30,
    'year': 365,
    'years': 365,
}