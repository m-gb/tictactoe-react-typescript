import { action, observable } from 'mobx'

export interface GameHistory {
  squares: string[]
}

export interface GameState {
  history: GameHistory[]
  stepNumber: number
  xIsNext: boolean
}

export default class Logic {
  @observable state: GameState

  public constructor() {
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true
    }
  }

  @action
  public handleClick(i: number): void {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
  
    if (this.calculateWinner(squares) || squares[i]) {
      return
    }
  
    squares[i] = this.state.xIsNext ? 'X' : 'O'
  
    this.state = {
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    }
  }

  @action
  public jumpTo(step: number): void {
    this.state = {
      history: this.state.history.slice(0, (step + 1)),
      stepNumber: step,
      xIsNext: (step % 2) === 0
    }
  }

  public calculateWinner (squares: string[]): string | null {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }
}
