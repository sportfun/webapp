import { IntlProvider, addLocaleData } from 'react-intl'
import { MemoryRouter as Router } from 'react-router-dom'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import localeDataFr from 'react-intl/locale-data/fr'

it('renders without crashing', () => {
  addLocaleData(localeDataFr)

  ReactDOM.render(
    <IntlProvider locale="fr">
      <Router>
        <App />
      </Router>
    </IntlProvider>,
    document.createElement('div'),
  )
})
