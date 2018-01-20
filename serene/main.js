'use strict'

const Prng = require('./prng-utils.js')
const Phono = require('./phonology/phonology.js')

exports.generate = function generate (seed = undefined) {
  let results = []

  let prng = new Prng.PrngUtils(seed)
  results.push(prng.getSeed())

  let phonology = new Phono.Phonology(prng)
  results.push(phonology.makeChart())

  return results
}
