import * as assert from 'power-assert'
import { Card, Mark } from '../src/card'
import { Deck } from '../src/deck'
import { CPU } from '../src/player'

describe('Player Class', () => {
    function drawAll(cards: Card[]): CPU {
        const cpu = new CPU()
        const deck = new Deck(cards)
        // for (let i = 0; i < cards.length; i++) {
        //     cpu.draw(deck);
        // }
        for (const card of cards) {
            cpu.draw(deck)
        }
        return cpu
    }
    it('Ace card can be 1 or 11', () => {
        let cards = [new Card(Mark.Spade, 1)]
        let cpu = drawAll(cards)
        assert(cpu.score() === 11)

        cards = [new Card(Mark.Spade, 1), new Card(Mark.Heart, 1)]
        cpu = drawAll(cards)
        assert(cpu.score() === 12)

        cards = [
            new Card(Mark.Spade, 1),
            new Card(Mark.Diamond, 1),
            new Card(Mark.Heart, 1),
        ]
        cpu = drawAll(cards)
        assert(cpu.score() === 13)

        cards = [
            new Card(Mark.Spade, 1),
            new Card(Mark.Diamond, 1),
            new Card(Mark.Club, 1),
            new Card(Mark.Heart, 1),
        ]
        cpu = drawAll(cards)
        assert(cpu.score() === 14)
    }),
        it('Ace can be changed for better score', () => {
            let cards = [new Card(Mark.Spade, 1), new Card(Mark.Spade, 13)]
            let cpu = drawAll(cards)
            assert(cpu.score() === 21)

            cards = [
                new Card(Mark.Spade, 1),
                new Card(Mark.Diamond, 1),
                new Card(Mark.Spade, 8),
            ]
            cpu = drawAll(cards)
            assert(cpu.score() === 20)

            cards = [
                new Card(Mark.Spade, 1),
                new Card(Mark.Heart, 1),
                new Card(Mark.Spade, 4),
                new Card(Mark.Spade, 11),
            ]
            cpu = drawAll(cards)
            assert(cpu.score() === 16)
        })
})
