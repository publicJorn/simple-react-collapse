import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import GroupManager from './GroupManager'

import './Collapse.css'
// MOCK CSS MODULES
const styles = {
  header: 'Collapse__header',
  content: 'Collapse__content',
  isOpen: 'Collapse__isOpen',
}

const groupManager = new GroupManager()

const Collapse = class extends Component {
  constructor (props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.close = this.close.bind(this)

    this.state = {
      isOpen: props.isOpen,
    }
  }

  shouldComponentUpdate () {
    return true
  }

  componentWillMount () {
    if (this.props.groupId) {
      groupManager.add(this)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.isOpen !== this.state.isOpen) {
      this.setState({ isOpen: nextProps.isOpen })
    }
  }

  renderHeader () {
    if (typeof this.props.toggler === 'string') {
      return <div className={styles.header} onClick={this.toggle}>
        {this.props.toggler}
      </div>
    }
    return React.cloneElement(this.props.toggler, {
      collapseIsOpen: this.state.isOpen,
      collapseToggle: this.toggle,
    })
  }

  componentWillUpdate (nextProps, nextState) {
    this.props.onToggle(nextState)
  }

  render () {
    const cn = classNames(
      styles.content,
      this.props.contentClassName,
      { [styles.isOpen]: this.state.isOpen },
    )

    // TODO: Does this.header get `isOpen` change when it's an element?
    return (
      <div>
        {this.renderHeader()}
        <div className={cn}>
          {this.props.children}
        </div>
      </div>
    )
  }

  toggle (evt, force) {
    if (this.props.groupId && !this.state.isOpen) {
      groupManager.focusOn(this)
    }

    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  close () {
    this.setState({ isOpen: false })
  }
}

Collapse.propTypes = {
  toggler: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
  contentClassName: PropTypes.string,
  isOpen: PropTypes.bool,
  groupId: PropTypes.string,
  positionInGroup: PropTypes.number,
  onToggle: PropTypes.func,
}

Collapse.defaultProps = {
  contentClassName: '',
  isOpen: false,
  groupId: '',
  positionInGroup: -1,
  onToggle: () => {},
}

export default Collapse
