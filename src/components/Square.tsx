import * as React from 'react'
import * as GameTypes from 'gameTypes'

export default class Square extends React.Component<GameTypes.SquareProps, {}> {
  public render () {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    )
  }
}
