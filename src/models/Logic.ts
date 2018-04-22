import Game from '../components/Game'

export default class Logic {
  public static handleClick(i: number, g: Game) {
    const history = g.state.history.slice(0, g.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()

    if (this.calculateWinner(squares) || squares[i]) {
      return
    }

    squares[i] = g.state.xIsNext ? 'X' : 'O'

    g.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !g.state.xIsNext,
      stepNumber: history.length
    })
  }

  public static jumpTo(step: number, g: Game) {
    g.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }

  public static calculateWinner(squares: string[]) {
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
