import * as serviceWorker from './serviceWorker'
import { IntlProvider, addLocaleData } from 'react-intl'
import { BrowserRouter as Router } from 'react-router-dom'
import { SessionProvider } from './SessionContext'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import localeDataFr from 'react-intl/locale-data/fr'

addLocaleData(localeDataFr)

ReactDOM.render(
  <IntlProvider locale="fr">
    <SessionProvider>
      <Router>
        <App />
      </Router>
    </SessionProvider>
  </IntlProvider>,
  document.getElementById('root'),
)

serviceWorker.unregister()
