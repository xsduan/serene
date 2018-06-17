import React from 'react'

import { ConsonantChart } from './components/ipa-charts'
import { PrngConsumer } from './components/prng-context'
import { generatePhonology } from './utils/phonology'

export default () => (
  <div id="generated-ipa-chart">
    <PrngConsumer>
      {prng => <ConsonantChart phonology={generatePhonology(prng)} />}
    </PrngConsumer>
  </div>
)
