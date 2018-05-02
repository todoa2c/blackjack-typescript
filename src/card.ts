export enum Mark {
    Spade = '♠',
    Heart = '♥',
    Club = '♣',
    Diamond = '♦',
}

export class Card {
    constructor(private _mark: Mark, private _number: number) {}

    get mark(): Mark {
        return this._mark
    }

    get number(): number {
        return this._number
    }

    public toString(): string {
        let val
        switch (this.number) {
            case 1:
                val = 'A'
                break
            case 11:
                val = 'J'
                break
            case 12:
                val = 'Q'
                break
            case 13:
                val = 'K'
                break
            default:
                val = this.number.toString()
                break
        }
        return `${this.mark}:${val}`
    }
}
