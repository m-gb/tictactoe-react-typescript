import * as React from 'react'
import Logic from '../models/Logic'
import Board from './Board'

export interface History {
  squares: string[]
}

interface GameState {
  history: History[]
  stepNumber: number
  xIsNext: boolean
}

export default class Game extends React.Component<{}, GameState> {
  public constructor(props: {}) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true
    }
  }

  public render() {
    const history: History[] = this.state.history
    const current: History = history[this.state.stepNumber]
    const winner: string|null = Logic.calculateWinner(current.squares)

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : 'Go to game start'
      return (
        <li key={move}>
          <button onClick={() => Logic.jumpTo(move, this)}>{desc}</button>
        </li>
      )
    })

    let status: string
    if (winner) {
      status = `Winner: ${winner}`
    } else {
      status = `Next player:  ${(this.state.xIsNext ? 'X' : 'O')}`
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i: number) => Logic.handleClick(i, this)}
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
