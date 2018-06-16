import React, { Component } from 'react'

import Consonant from './consonant'

export default class App extends Component {
  render () {
    return [...Array(12).keys()].map(p =>
      [...Array(8).keys()].map(m =>
        [...Array(2).keys()].map(v =>
          [false, true].map(a => (
            <p key={`Consonant:${m}:${p}:${v}:${a}`}>
              <Consonant manner={m} place={p} voicing={v} aspirated={a} />
            </p>
          ))
        )
      )
    )
  }
}
