import Mersenne from 'mersenne-twister'

export default class Prng extends Mersenne {
  constructor (seed = null) {
    seed = seed || Date.now()
    super(seed)

    // save seed for future reference
    this.seed = seed
  }

  randInt (n) {
    return this.random_int() % n
  }

  /**
   * Finds a random int by weight
   *
   * @param {number[]} curve Probabilities of 1/curve.length weights
   */
  randIntWeighted (curve) {
    let roll = this.randInt(curve.reduce((acc, curr) => acc + curr, 0))

    // accumulate until greater than roll
    let sum = 0
    for (let i = 0; i < curve.length; i++) {
      // gross that we have to use a manual for loop but oh well
      sum += curve[i]
      if (sum >= roll) {
        return i
      }
    }
  }

  randElement (arr, curve = null) {
    return curve
      ? arr[this.randIntWeighted(curve)]
      : arr[this.randInt(arr.length)]
  }
}
