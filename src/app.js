import React, { Component } from 'react'

import { ConsonantChart } from './ipa-charts'

export default class App extends Component {
  render () {
    return (
      <div id="generated-ipa-chart">
        <ConsonantChart />
      </div>
    )
  }
}
