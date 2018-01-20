'use strict'

const Mersenne = require('mersenne-twister')

exports.PrngUtils = class PrngUtils extends Mersenne {

  /**
   * Returns random number up to a max value. [0, n)
   *
   * @param {int} n Max random number (non inclusive)
   *
   * @return {int} Random number
   */
  randInt (n) {
    return this.random_int() % n
  }

  /**
   * Transform assumed uniform distribution to weighted curve distribution
   *
   * @param {Array<int>} dist Weight curve
   * @param {int} n Original number
   *
   * @returns {int} Weight transformed number
   */
  transform (dist, n) {
    let left = 0
    let right = dist.length
    while (left < right - 1) {
      // find middle
      let mid = (left + right) >> 1
      let midval = dist[mid]

      // shift weight center
      if (midval === n) {
        return mid
      }

      // trim edge indices
      if (midval < n) {
        left = mid
      } else if (midval > n) {
        right = mid
      }
    }

    // closest match
    return left
  }

  /**
   * Finds a random int by weight
   *
   * @param {Array<int>} curve Probabilities of 1/curve.length weights
   */
  randIntWeighted (curve) {
    // generate weight curve
    let dist = []
    let sum = 0
    for (let increment of curve) {
      dist.push(sum)
      sum += increment
    }

    // generate uniform distribution random number
    let roll = this.randInt(sum)

    // transform
    return this.transform(dist, roll)
  }

  /**
   * Get an object from the list, uniform distribution
   *
   * @param {Array<Object>} l List of items
   *
   * @return {Object} Random object from list
   */
  randElem (l) {
    return l[this.randInt(l.length)]
  }

}
