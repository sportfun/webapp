import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'
import ApiManager from '../ApiManager'
import AuthManager from '../AuthManager'

class Messages extends Component {
  state = {
    recipientUsername: '',
    newMessage: '',
    snippets: [],
    errorMessage: '',
    successMessage: '',
  }
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
      this.socket.on('snippets', this.snippetsHandler)
      this.socket.emit('snippets')
    }
  }

  snippetsHandler = data => {
    ApiManager.getUserById(data.id).then(recipient => {
      this.setState(prevState => {
        const snippets = prevState.snippets.filter(
          snippet => snippet.id !== data.id,
        )
        const snippet = {
          id: data.id,
          recipient: {
            profilePic: recipient.profilePic,
            firstName: recipient.firstName,
            lastName: recipient.lastName,
          },
          updatedAt: data.message.updatedAt,
          content: data.message.content,
        }
        snippets.push(snippet)
        return {
          snippets: snippets,
        }
      })
    })
  }

  infoHandler = data => {
    if (data.success === true) {
      this.setState({
        successMessage: 'Message envoyé',
      })
      this.socket.emit('snippets')
    }
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
      ApiManager.getUserByUsername(this.state.recipientUsername)
        .then(response => {
          const id = response['_id']
          this.socket.emit('message', {
            to: id,
            content: this.state.newMessage,
          })
        })
        .catch(error => {
          this.setState({
            errorMessage:
              error === `User ${this.state.recipientUsername} not found`
                ? 'Utilisateur inconnu'
                : "L'envoi a échoué",
          })
        })
    }
  }

  formatSnippets() {
    const snippets = this.state.snippets
    if (snippets.length === 0) {
      return <p>Aucune conversation</p>
    }
    return (
      <div>
        {[...snippets]
          .sort((snippet1, snippet2) => {
            return new Date(snippet1.updatedAt) - new Date(snippet2.updatedAt)
          })
          .reverse()
          .map(this.formatSnippet)}
      </div>
    )
  }

  formatSnippet(snippet, i) {
    return (
      <Link to={`/conversation/${snippet.id}`} key={i}>
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '0.25rem',
            padding: '8px 14px',
            marginBottom: '10px',
            display: 'flex',
          }}
        >
          <div>
            <img
              style={{
                borderRadius: '50%',
                maxWidth: '48px',
              }}
              src={snippet.recipient.profilePic}
            />
          </div>
          <div style={{ marginLeft: '1rem' }}>
            <p
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '350px',
                margin: 0,
                fontWeight: 700,
              }}
            >
              {snippet.recipient.firstName} {snippet.recipient.lastName}
            </p>
            <p
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '350px',
                margin: 0,
              }}
            >
              {snippet.content}
            </p>
          </div>
        </div>
      </Link>
    )
  }

  render() {
    return (
      <div className="pagecontainer p-sm-5">
        <h3>Nouvelle conversation</h3>
        {this.state.errorMessage && (
          <div className="alert alert-danger" role="alert">
            {this.state.errorMessage}
          </div>
        )}
        {this.state.successMessage && (
          <div className="alert alert-success" role="alert">
            {this.state.successMessage}
          </div>
        )}
        <form onSubmit={this.submit}>
          <div className="form-group mb-2">
            <input
              onChange={this.handleChange}
              value={this.state.recipientUsername}
              name="recipientUsername"
              className="form-control"
              type="text"
              placeholder="Nom d'utilisateur"
            />
          </div>
          <div className="form-group mb-2">
            <textarea
              onChange={this.handleChange}
              name="newMessage"
              className="form-control"
              rows="3"
              placeholder="Message"
              value={this.state.newMessage}
            />
          </div>
          <button type="submit" className="btn btn-primary mb-2">
            Envoyer
          </button>
        </form>
        <h3>Conversations</h3>
        {this.formatSnippets()}
      </div>
    )
  }
}

export default Messages
