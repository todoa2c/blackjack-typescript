import * as assert from 'power-assert'
import { Card } from '../src/card'
import { Deck } from '../src/deck'

describe('Deck Class', () => {
    it('Can draw a card', () => {
        const deck = new Deck()
        const card1 = deck.draw()
        const card2 = deck.draw()
        assert.notDeepEqual(card1, card2)
    })

    it('Number of cards are 52', () => {
        const deck = new Deck()
        for (let i = 0; i < 52; i++) {
            deck.draw()
        }
        assert.throws(() => {
            deck.draw()
        })
    })
})
