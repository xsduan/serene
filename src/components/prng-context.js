import React from 'react'

import Prng from '../utils/prng'

const PrngContext = React.createContext()

export const PrngProvider = ({ seed, children }) => (
  <PrngContext.Provider value={new Prng(seed)}>{children}</PrngContext.Provider>
)

export const PrngConsumer = PrngContext.Consumer
