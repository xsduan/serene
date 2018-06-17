import React from 'react'

import Prng from '../utils/prng'

const PrngContext = React.createContext()

export function PrngProvider ({ children, seed = null }) {
  return (
    <PrngContext.Provider value={new Prng(seed || Date.now())}>
      {children}
    </PrngContext.Provider>
  )
}

export const PrngConsumer = PrngContext.Consumer
