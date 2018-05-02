import * as assert from 'power-assert'
import { Card, Mark } from '../src/card'
import { Deck } from '../src/deck'
import { Game } from '../src/game'
import { CPU, Player } from '../src/player'

describe('Game Class', () => {
    it('have two cards for player and cpu', () => {
        const cards: Card[] = [
            new Card(Mark.Spade, 2),
            new Card(Mark.Club, 13),
            new Card(Mark.Heart, 11),
            new Card(Mark.Diamond, 8),
        ]
        const game = new Game(new Player(), new CPU(), cards)
        game.initialDraw()
        assert.strictEqual(game.player.cards.length, 2)
        assert.strictEqual(game.player.cards[0], cards[0])
        assert.strictEqual(game.player.cards[1], cards[1])
        assert.strictEqual(game.player.score(), 12)
        assert.strictEqual(game.cpu.cards.length, 2)
        assert.strictEqual(game.cpu.cards[0], cards[2])
        assert.strictEqual(game.cpu.cards[1], cards[3])
        assert.strictEqual(game.cpu.score(), 18)

        assert(game.judge() === 'CPUの勝ちです。')
    })

    it('CPU continues drawing until score is larger than 17', () => {
        const cards: Card[] = [
            new Card(Mark.Diamond, 6),
            new Card(Mark.Club, 12),
            new Card(Mark.Heart, 2),
            new Card(Mark.Spade, 2),
            new Card(Mark.Spade, 3),
        ]
        const cpu = new CPU()
        const game = new Game(cpu, new CPU(), cards)
        game.turnOf(cpu)
        assert(cpu.score() >= 17)
        assert(cpu.cards.length === 3)

        cards[2] = new Card(Mark.Club, 5)
        game.turnOf(cpu)
        assert(cpu.score() >= 17)
        assert(cpu.cards.length === 3)
    })

    it('burst when greater than 21', () => {
        const cards: Card[] = [
            new Card(Mark.Spade, 3),
            new Card(Mark.Spade, 2),
            new Card(Mark.Heart, 2),
            new Card(Mark.Club, 9),
            new Card(Mark.Diamond, 7),
        ]
        const cpu = new CPU()
        const game = new Game(cpu, new CPU(), cards)
        assert.throws(() => game.turnOf(cpu))
    })

    it('draw when no cards are sent', () => {
        assert(
            new Game(new CPU(), new CPU()).judge() === '勝負は引き分けです。'
        )
    })

    it('judge without burst', () => {
        const cards: Card[] = [
            new Card(Mark.Spade, 4),
            new Card(Mark.Heart, 10),
            new Card(Mark.Spade, 8),
            new Card(Mark.Club, 9),
            new Card(Mark.Diamond, 4),
        ]
        const game = new Game(new CPU('CPU1'), new CPU('CPU2'), cards)
        game.initialDraw()
        const result = game.start()
        assert(result === 'CPU1の勝ちです。')
    })

    it('CPU1 bursts', () => {
        const cards: Card[] = [
            new Card(Mark.Spade, 6),
            new Card(Mark.Spade, 8),
            new Card(Mark.Heart, 10),
            new Card(Mark.Club, 9),
            new Card(Mark.Diamond, 10),
        ]
        const game = new Game(new CPU('CPU1'), new CPU('CPU2'), cards)
        game.initialDraw()
        const result = game.start()
        assert(result === 'CPU2の勝ちです。')
    })

    it('CPU2 bursts', () => {
        const cards: Card[] = [
            new Card(Mark.Spade, 6),
            new Card(Mark.Heart, 10),
            new Card(Mark.Spade, 8),
            new Card(Mark.Club, 6),
            new Card(Mark.Diamond, 1),
            new Card(Mark.Heart, 13),
        ]
        const game = new Game(new CPU('CPU1'), new CPU('CPU2'), cards)
        game.initialDraw()
        const result = game.start()
        assert(result === 'CPU1の勝ちです。')
    })

    it('bug on card 4, 1, 9, 11', () => {
        const cards: Card[] = [
            new Card(Mark.Spade, 4),
            new Card(Mark.Heart, 1),
            new Card(Mark.Spade, 9),
            new Card(Mark.Club, 11),
        ]
        const cpu = new CPU('BugOn4,1,9,11')
        const game = new Game(cpu, new CPU(), cards)
        assert.throws(() => game.turnOf(cpu))
        assert(cpu.score() === 24)
    })
})
