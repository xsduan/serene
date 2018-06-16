import React, { Component } from 'react'

import { consonants } from './phonology.json'

export default class Consonant extends Component {
  static name (p, m, v, a = false) {
    let names = consonants.names
    let unaspirated = [
      names.voicings[v],
      names.places[p],
      names.manners[m]
    ].join(' ')
    return a ? `${names.aspiration[v]} ${unaspirated}` : unaspirated
  }

  static ipa (m, p, v, a = false) {
    let raw = consonants.ipa.main[m][p][v]
    return a ? `${raw}${consonants.ipa.modifiers.aspiration[v]}` : raw
  }

  static valid (m, p, v) {
    return !!consonants.ipa.main[m][p][v]
  }

  render () {
    let { place: p, manner: m, voicing: v, aspirated: a } = this.props
    return (
      <span title={Consonant.name(m, p, v, a)}>
        {Consonant.ipa(m, p, v, a)}
      </span>
    )
  }
}
