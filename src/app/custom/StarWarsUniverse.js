import Starship from "./Starship"


export default class StarWarsUniverse {
    constructor() {
        this.starships = [];
    }


    async init() {
        const starshipCount = await this._getStarshipCount()
        await this._createStarships(starshipCount)
    }

    async _getStarshipCount() {
        const STARSHIPS_API = 'https://swapi.boom.dev/api/starships/'
        const response = await fetch(STARSHIPS_API)
        const { count } = await response.json();
        return count
    }

    async _createStarships(starshipCount) {
        for (let i = 0; i < starshipCount; i++) {
            const res = await fetch(`https://swapi.boom.dev/api/starships/${i}`)

            if (res.ok) {
                const data = await res.json();

                if(this._validateData(data)){
                     this.starships.push(new Starship(data.name, data.consumables, data.passengers))
                }
            }
        }
    }

    get theBestStarship() {
        return this.starships.reduce((currentShip, candidate) => {
            if (currentShip.maxDaysInSpace > candidate.maxDaysInSpace) {
                return currentShip
            } else {
                return candidate
            }
        })
    }

    _validateData(data) {
        if (data.consumables === null ||
            data.consumables === undefined ||
            data.consumables === "unknown" ||
            data.passengers === undefined ||
            data.passengers === null ||
            data.passengers === "n/a" ||
            data.passengers === '0' ){
                return false;
            }
        return true;
    }
}