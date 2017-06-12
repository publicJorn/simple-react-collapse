import React, { Component } from 'react'

import Collapse from './components/Collapse'

import logo from './logo.svg'
import './App.css'

const CollapseHeader = (props) => {
  const openClassName = props.collapseIsOpen ? 'collapseIsOpen' : ''
  return (
    <header
      className={`my-collapse-header ${openClassName}`}
      onClick={props.collapseToggle}>
      {props.text}
    </header>
  )
}

class App extends Component {
  constructor (props) {
    super(props)
    this.handleX = this.handleX.bind(this)
    this.alertAboutX = this.alertAboutX.bind(this)
    this.state = { xIsOpen: true }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Collapse <small className="App-tinytext">(or open)</small> it!</h2>
        </div>

        <Collapse toggler={<CollapseHeader text="Component toggler" />}>
          <p>
            This Collapse is using a component as header.<br/>
            Note that the boolean `collapseIsOpen` and method `collapseToggle` are exposed to this component.
          </p>
        </Collapse>

        <hr />

        <Collapse toggler="Test nested">
          <p>Click away</p>

          <Collapse toggler="Test nested">
            <p>Nested collapsible content</p>
          </Collapse>
        </Collapse>

        <hr />

        <Collapse toggler="Accordeon 1/3" groupId="ac1">
          <p>one of three</p>
        </Collapse>
        <Collapse toggler="Accordeon 2/3" groupId="ac1">
          <p>two of three</p>
        </Collapse>
        <Collapse toggler="Accordeon 3/3" groupId="ac1">
          <p>The third one</p>
        </Collapse>

        <hr />

        <Collapse toggler="Component X" isOpen={this.state.xIsOpen} onToggle={(newState) => this.alertAboutX(newState)}>
          <p>
            This one is open by default.<br />
            You can trigger a toggle from another component.
            To do this safely, you need to make use of the parents' state.
          </p>
        </Collapse>

        <hr />

        <button type="button" onClick={() => this.handleX(false)}>Close component X</button><br/>
        <button type="button" onClick={() => this.handleX()}>Toggle component X</button>
      </div>
    )
  }

  handleX (open) {
    // Toggle or force
    open = (typeof open === 'undefined') ? !this.state.xIsOpen : open
    this.setState({ xIsOpen: open })
  }

  alertAboutX (nextState) {
    if (nextState.isOpen) {
      alert('Thanks for opening!\n(you can also listen to the `onToggle` event)')
    }
  }
}

export default App
