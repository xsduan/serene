import React from 'react'

import { ConsonantChart } from './components/ipa-charts'
import { PrngProvider, PrngConsumer } from './components/prng-context'
import { generatePhonology } from './utils/phonology'

function getSeed () {
  return new URLSearchParams(window.location.search).get('r')
}

function getURL (seed) {
  let currURL = new URL(window.location.href)
  currURL.searchParams.set('r', seed)
  return currURL.toString()
}

export default () => (
  <PrngProvider seed={getSeed()}>
    <div id="generated-ipa-chart">
      <PrngConsumer>
        {prng => (
          <React.Fragment>
            <ConsonantChart phonology={generatePhonology(prng)} />{' '}
            <p>
              seed: <a href={getURL(prng.seed)}>{prng.seed}</a>
            </p>
          </React.Fragment>
        )}
      </PrngConsumer>
    </div>
  </PrngProvider>
)
