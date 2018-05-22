import * as React from 'react'
import Logic, { GameHistory } from '../models/Logic'
import Board from './Board'

interface GameProps {
  logic: Logic
}

interface HistoryProps {
  history: GameHistory[]
  logic: Logic
}

interface StatusProps {
  current: GameHistory
  logic: Logic
}

export default class Game extends React.Component<GameProps, {}> {
  public render() {
    const history: GameHistory[] = this.props.logic.state.history
    const current: GameHistory = history[this.props.logic.state.stepNumber]
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i: number) => {
              this.props.logic.handleClick(i)
            }}
          />
        </div>
        <div className="game-info">
          <Status 
            current={current}
            logic={this.props.logic}
          />
          <History 
            history={history}
            logic={this.props.logic}
          />
        </div>
      </div>
    )
  }
}

class History extends React.Component<HistoryProps, {}> {
  public render() {
    const moves = this.props.history.map((step, move) => {
      const desc: string = move ? `Go to move #${move}` : 'Go to game start'
      return (
        <li key={move}>
          <button 
            onClick={() => {
              this.props.logic.jumpTo(move)
            }}
          >{desc}
          </button>
        </li> 
      )
    })
    return <ol>{moves}</ol>
  }
}

class Status extends React.Component<StatusProps, {}> {
  public render() {
    const winner: string | null = this.props.logic.calculateWinner(this.props.current.squares)
    let status: string
    if (winner) {
      status = `Winner: ${winner}`
    } else {
      status = `Next player:  ${(this.props.logic.state.xIsNext ? 'X' : 'O')}`
    }
    return <div>{status}</div>
  }
}
