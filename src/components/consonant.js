import React from 'react'

import { name, ipa } from '../utils/consonant'

export default function Consonant ({
  manner: m,
  place: p,
  voicing: v,
  aspirated: a
}) {
  return <span title={name(m, p, v, a)}>{ipa(m, p, v, a)}</span>
}
