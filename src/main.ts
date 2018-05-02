import { Game } from './game'
import { CPU, Player } from './player'

const game = new Game(new Player(), new CPU())
game.initialDraw()
game.start()
