import { Card } from './card'
import { Deck } from './deck'
import { PlayerBase } from './player'

export class Game {
    private cpuCard2: string
    private _deck: Deck
    constructor(
        readonly player: PlayerBase,
        readonly cpu: PlayerBase,
        debugCards?: Card[]
    ) {
        this._deck = new Deck(debugCards)
    }
    public initialDraw() {
        this.log('ゲームを開始します。')
        this.log(this.player.draw(this._deck))
        this.log(this.player.draw(this._deck))
        this.log(this.cpu.draw(this._deck))
        this.cpuCard2 = this.cpu.draw(this._deck)
        this.log('CPUの引いたカードは不明です。')
    }
    public start(): string {
        try {
            this.turnOf(this.player)
        } catch (burst) {
            this.log(burst.message)
            const message = `${this.cpu.name}の勝ちです。`
            this.log(message)
            return message
        }
        try {
            this.log(this.cpuCard2)
            this.turnOf(this.cpu)
        } catch (burst) {
            this.log(burst.message)
            const message = `${this.player.name}の勝ちです。`
            this.log(message)
            return message
        }
        const result = this.judge()
        this.log(result)
        return result
    }

    public judge(): string {
        if (this.player.score() === this.cpu.score()) {
            return '勝負は引き分けです。'
        }
        if (this.player.score() > this.cpu.score()) {
            return `${this.player.name}の勝ちです。`
        }
        return `${this.cpu.name}の勝ちです。`
    }

    public turnOf(aPlayer: PlayerBase) {
        const score = aPlayer.score()
        this.log(`${aPlayer.name}のスコアは${score}です。`)
        this.validateBurst(aPlayer)
        const gotoNext = aPlayer.judgeNext()
        if (!gotoNext) {
            return
        }
        this.log(aPlayer.draw(this._deck))
        this.turnOf(aPlayer)
    }

    private log(message: string) {
        console.log(message)
    }

    private validateBurst(player: PlayerBase) {
        if (player.score() > 21) {
            throw new Error(
                `${player.name}はバーストしました。
                スコアは${player.score()}です。`
            )
        }
    }
}
