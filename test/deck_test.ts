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
})
