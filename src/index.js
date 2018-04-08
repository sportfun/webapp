import 'bootstrap/dist/js/bootstrap.min'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router } from 'react-router-dom'
import { SessionProvider } from './SessionContext'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <SessionProvider>
    <Router>
      <App />
    </Router>
  </SessionProvider>,
  document.getElementById('root'),
)

serviceWorker.unregister()
