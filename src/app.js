import React, { Component } from 'react'

import { ConsonantChart } from './components/ipa-charts'

export default class App extends Component {
  render () {
    return (
      <div id="generated-ipa-chart">
        <ConsonantChart />
      </div>
    )
  }
}
