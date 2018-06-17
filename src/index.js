import React from 'react'
import ReactDOM from 'react-dom'

import App from './app'
import { PrngProvider } from './components/prng-context'

import '../static/index.scss'

ReactDOM.render(
  <PrngProvider>
    <App />
  </PrngProvider>,
  document.getElementById('app')
)
