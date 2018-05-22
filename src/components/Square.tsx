import * as React from 'react'

interface SquareProps {
  value: string
  onClick: () => void
}

export default class Square extends React.Component<SquareProps, {}> {
  public render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    )
  }
}
