import { Card, Mark } from './card'

export class Deck {
    private cards: Card[]
    constructor(debugCards?: Card[]) {
        if (debugCards !== undefined) {
            this.cards = debugCards.slice(0, debugCards.length).reverse()
            return
        }
        const cards = []
        for (let i = 1; i <= 13; i++) {
            cards.push(new Card(Mark.Spade, i))
            cards.push(new Card(Mark.Heart, i))
            cards.push(new Card(Mark.Club, i))
            cards.push(new Card(Mark.Diamond, i))
        }

        this.cards = this.shuffle(cards)
    }

    public draw(): Card {
        if (this.cards.length === 0) {
            throw new Error('No cards in this deck')
        }
        return this.cards.pop()
    }

    private shuffle(array) {
        let n = array.length

        while (n) {
            const i = Math.floor(Math.random() * n--)
            const t = array[n]
            array[n] = array[i]
            array[i] = t
        }

        return array
    }
}
