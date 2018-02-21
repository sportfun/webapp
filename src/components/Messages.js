import React, { Component } from 'react'
import history from '../functions/history'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Messages extends Component {
  constructor(props) {
    super(props)
    this.state = { username: '', message: '', conversations: [] }
  }

  fetchConversations() {
    axios.get('http://149.202.41.22:8080/api/messages', {
      token: this.token,
    }).then(response => {
      this.setState(prevState => {
        return { ...prevState, conversations: response.messages }
      })
    }).catch(error => {
      console.log(error.response)
    })
  }

  componentWillMount() {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    if (!token) {
      history.push('/connexion')
    }
    this.token = token
    this.fetchConversations()
  }

  getFormattedMessages() {
    const conversations = this.state.conversations
    if (conversations.length === 0) {
      return (
        <p>Aucune conversation</p>
      )
    }
    return (
      <div>
        {conversations.map((conversation, i) => {
          return (
            <Link to={`/conversation/${conversation.id}`} key={i}>
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '18px',
                padding: '8px 14px',
                marginBottom: '10px',
                display: 'inline-block',
              }}>
                <p style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '350px',
                  margin: 0,
                }}>{conversation.lastConversation}</p>
              </div>
            </Link>
          )
        })}
      </div>
    )
  }

  onChange = event => {
    const target = event.target
    const name = target.name
    const value = target.value
    this.setState(prevState => {
      return { ...prevState, [name]: value }
    })
  }

  getIdFromUsername(username) {
    return Promise.resolve(1)
  }

  submit = e => {
    e.preventDefault()
    const username = this.state.username
    const message = this.state.message
    this.setState(prevState => {
      return { ...prevState, username: '', message: '' }
    })
    this.getIdFromUsername(username).then(destId => {
      axios.post('http://149.202.41.22:8080/api/message', {
        content: message,
        to: destId,
      }, {
        headers: {
          'token': this.token,
        },
      }).then(() => {
        this.setState(prevState => {
          return {
            ...prevState, conversations: [...prevState.conversations, {
              id: destId,
              lastConversation: message,
            }],
          }
        })
      })
        .catch(error => {
          console.log(error.response)
        })
    })
  }

  render() {
    return (
      <div className="pagecontainer p-sm-5">
        <h3>Nouvelle conversation</h3>
        <form onSubmit={this.submit} className="form-inline">
          <div className="form-group mb-2">
            <input onChange={this.onChange} value={this.state.username} name="username" className="form-control"
              type="text"
              placeholder="Nom d'utilisateur" />
          </div>
          <div className="form-group mx-sm-3 mb-2">
            <input onChange={this.onChange} value={this.state.message} name="message" className="form-control"
              type="text" placeholder="Message" />
          </div>
          <button type="submit" className="btn btn-primary mb-2">Envoyer</button>
        </form>
        <h3>Conversations</h3>
        {this.getFormattedMessages()}
      </div>
    )
  }
}

export default Messages
