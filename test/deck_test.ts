import * as assert from 'power-assert'
import { Card } from '../src/card'
import { Deck } from '../src/deck'

describe('Deck Class', () => {
    it('Number of cards are 52 and all cards are different', () => {
        const deck = new Deck()
        const cards = {}
        for (let i = 0; i < 52; i++) {
            const card = deck.draw()
            cards[card.toString()] = card
        }
        assert.throws(() => {
            deck.draw()
        })
        assert(Object.keys(cards).length === 52)
    })
})
