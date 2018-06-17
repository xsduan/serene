import React from 'react'

import { name, ipa } from '../utils/consonant'

export default ({ manner: m, place: p, voicing: v, aspirated: a }) => (
  <span title={name(m, p, v, a)}>{ipa(m, p, v, a)}</span>
)
