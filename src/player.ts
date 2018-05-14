import * as promptSync from 'prompt-sync'
import { Card } from './card'
import { Deck } from './deck'

export abstract class PlayerBase {
    protected _cards: Card[]
    constructor() {
        this._cards = []
    }
    get cards(): Card[] {
        return this._cards
    }

    abstract get name(): string

    public abstract judgeNext(): boolean

    public draw(deck: Deck): string {
        const card = deck.draw()
        this._cards.push(card)
        return this.drawMessage(card)
    }

    public drawMessage(card: Card) {
        return `${this.name}の引いたカードは${card}です。`
    }

    public score(): number {
        const scoresExcludeAce: number[] = this._cards
            .filter(card => card.number > 1)
            .map(card => {
                if (card.number > 10) {
                    return 10
                }
                return card.number
            })
        const scoreExcludeAce = scoresExcludeAce.reduce((a, b) => a + b, 0)
        const numOfAce = this._cards.length - scoresExcludeAce.length
        if (numOfAce === 0) {
            return scoreExcludeAce
        }

        // case that have aces
        const scorePattern = [numOfAce, 10 + numOfAce]
        const scoresWithAce = [
            scorePattern[0] + scoreExcludeAce,
            scorePattern[1] + scoreExcludeAce,
        ].filter(score => score < 22)
        if (scoresWithAce.length === 0) {
            return scorePattern[0] + scoreExcludeAce
        }
        return Math.max(...scoresWithAce)
    }
}

export class Player extends PlayerBase {
    constructor() {
        super()
    }
    public judgeNext(): boolean {
        const prompt = promptSync()
        while (true) {
            const result = prompt('次のカードを引きますか? [Y/n]').toLowerCase()
            if (result[0] === 'y') {
                return true
            }
            if (result[0] === 'n') {
                return false
            }
        }
    }
    get name(): string {
        return 'あなた'
    }
}

export class CPU extends PlayerBase {
    private _name: string
    constructor(name?: string) {
        super()
        this._name = name ? name : 'CPU'
    }
    public judgeNext(): boolean {
        return this.score() < 17
    }
    get name(): string {
        return this._name
    }
}
