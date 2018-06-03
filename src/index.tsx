import * as React from 'react'
import * as ReactDOM from 'react-dom'
import DevTools from 'mobx-react-devtools'
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
      <DevTools />
    </div>,
    document.getElementById('root')
  )
}

let logic = new Logic()
renderLogic(logic)
