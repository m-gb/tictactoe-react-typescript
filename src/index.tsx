import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Game from './components/Game'
import Logic from './models/Logic'
import './index.css'

function renderLogic(gameLogic: Logic): void {
  ReactDOM.render(
    <div>
      <Game
        logic={gameLogic}
      />
      <Game 
        logic={gameLogic}
      />
    </div>,
    document.getElementById('root')
  )
}

let logic = new Logic()
renderLogic(logic)
logic.onStateChange(() => renderLogic(logic))
