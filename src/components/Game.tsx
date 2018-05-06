import * as React from 'react'
import Logic, { History } from '../models/Logic'
import Board from './Board'

export default class Game extends React.Component {
  public gameLogic: Logic = new Logic()

  public render() {
    const history: History[] = this.gameLogic.state.history
    const current: History = history[this.gameLogic.state.stepNumber]
    const winner: string|null = this.gameLogic.calculateWinner(current.squares)

    const moves = history.map((step, move) => {
      const desc: string = move ? `Go to move #${move}` : 'Go to game start'
      return (
        <li key={move}>
          <button onClick={() => this.setState(() => this.gameLogic.jumpTo(move))}>{desc}</button>
        </li>
      )
    })

    let status: string
    if (winner) {
      status = `Winner: ${winner}`
    } else {
      status = `Next player:  ${(this.gameLogic.state.xIsNext ? 'X' : 'O')}`
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i: number) => this.setState(() => this.gameLogic.handleClick(i))}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}
