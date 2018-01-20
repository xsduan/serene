'use strict'

const Prng = require('./prng-utils.js')
const Phono = require('./phonology.js')

exports.generate = function generate (seed = undefined) {
  let results = []

  let prng = new Prng.PrngUtils(seed)

  let phonology = new Phono.Phonology(prng)
  results.push(phonology.makeChart())

  return results
}
