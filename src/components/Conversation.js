import React, { Component } from 'react'
import history from '../functions/history'
import axios from 'axios'
import moment from 'moment'
import cx from 'classnames'
import { Link } from 'react-router-dom'

require('moment/locale/fr')

moment.locale('fr')

class Conversation extends Component {
  constructor(props) {
    super(props)
    this.state = { message: '', messages: [] }
  }

  componentWillMount() {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    if (!token) {
      history.push('/connexion')
    }
    this.user = localStorage.getItem('user')
    this.setState(prevState => {
      return { ...prevState, token: token }
    })
    const id = this.props.match.params.id
    return axios.get(`http://149.202.41.22:8080/api/message/${id}`, {
      headers: {
        'token': this.state.token,
      },
    }).then(response => {
      this.setState(prevState => {
        return { ...prevState, messages: response.messages }
      })
    }).catch(error => {
      this.setState(prevState => {
        return { ...prevState, messages: [] }
      })
      console.log(error.response)
    })
  }

  getFormattedConversation() {
    const messages = this.state.messages
    return (
      <div className="conversation-wrap">
        <div className="conversation-container">
          {messages.map((message, i) => {
            return (
              <div key={i} className={cx('bubble', {
                'message-other': message.author !== this.user.id,
                'message-own': message.author === this.user.id,
              })}>
                <p>
                  <i className="timestamp">{message.timestamp.format('dddd Do MMMM YYYY à h:mm:ss')}</i>
                  <br />
                  {message.content}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  onChange = event => {
    const value = event.target.value
    this.setState(prevState => {
      return { ...prevState, message: value }
    })
  }

  submit = e => {
    e.preventDefault()
    const message = this.state.message

    this.setState(prevState => {
      return {
        ...prevState, messages: [...prevState.messages, {
          timestamp: moment(),
          author: this.user.id,
          content: message,
        }], message: '',
      }
    })
    console.log(this.state.token)
    axios.post('http://149.202.41.22:8080/api/message', {
      content: message,
      to: this.props.match.params.id,
    }, {
      headers: {
        'token': this.state.token,
      },
    }).catch(error => {
      this.setState(prevState => {
        return {
          ...prevState, message: message,
        }
      })
      console.log(error.response)
    })
  }

  render() {
    return (
      <div className="pagecontainer p-sm-5" style={{ backgroundColor: '#bfe4f8' }}>
        <Link to="/messages"><h6>&#8676; Retour aux conversations</h6></Link>
        {this.getFormattedConversation()}
        <hr />
        <form className="message-form" onSubmit={this.submit}>
          <input onChange={this.onChange} value={this.state.message} className="message-input" type="text"
            placeholder="Écrivez quelque chose…" />
        </form>
      </div>
    )
  }
}

export default Conversation
