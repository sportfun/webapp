import React, { Component } from 'react'
import moment from 'moment'
import cx from 'classnames'
import { Link } from 'react-router-dom'

import 'moment/locale/fr'
import io from 'socket.io-client'
import ApiManager from '../ApiManager'
import AuthManager from '../AuthManager'

moment.locale('fr')

class Conversation extends Component {
  state = { newMessage: '', messages: [] }
  socket = io.connect(ApiManager.getUrl())

  componentWillMount() {
    this.socket.on('registerMessages', this.registerMessagesHandler)
    this.socket.emit('registerMessages', {
      token: AuthManager.getToken(),
    })
  }

  registerMessagesHandler = data => {
    if (data.message === 'OK') {
      this.socket.on('info', this.infoHandler)
      this.socket.on('conversation', this.conversationHandler)
      this.socket.on('message', this.messageHandler)
      this.socket.emit('conversation', {
        id: this.props.match.params.id,
      })
    }
  }

  infoHandler = data => {
    if (data.message === 'Messages not found') {
      this.props.history.push('/messages')
    }

    if (data.success) {
      this.setState({
        newMessage: '',
      })
      this.socket.emit('conversation', {
        id: this.props.match.params.id,
      })
    }
  }

  conversationHandler = data => {
    this.setState({
      messages: data.messages.reverse(),
    })
  }

  messageHandler = () => {
    this.socket.emit('conversation', {
      id: this.props.match.params.id,
    })
  }

  formatConversation() {
    const messages = this.state.messages
    return (
      <div className="conversation-wrap">
        <div className="conversation-container">
          {messages.map((message, i) => {
            return (
              <div key={i} className={cx('bubble', {
                'message-other': message.author['_id'] === this.props.match.params.id,
                'message-own': message.author['_id'] !== this.props.match.params.id,
              })}>
                <p>{message.content}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  handleChange = event => {
    const {
      target: { name, value },
    } = event
    this.setState({ [name]: value })
  }

  submit = event => {
    event.preventDefault()
    if (this.state.newMessage.length > 0) {
      this.socket.emit('message', {
        to: this.props.match.params.id,
        content: this.state.newMessage,
      })
    }
  }

  render() {
    return (
      <div className="pagecontainer p-sm-5">
        <Link className="btn btn-outline-secondary" to="/messages">Retour aux conversations</Link>
        <hr />
        {this.formatConversation()}
        <hr />
        <form className="message-form" onSubmit={this.submit}>
          <div className="form-group">
            <input className="form-control message-input" name="newMessage" onChange={this.handleChange} value={this.state.newMessage} type="text"
              placeholder="Écrivez quelque chose…" />
          </div>
        </form>
      </div>
    )
  }
}

export default Conversation
