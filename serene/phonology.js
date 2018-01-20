'use strict'

const Consonant = require('./consonant.js')

exports.Phonology = class Phonology {
  /**
   *
   * @param {PrngUtils} generator
   */
  constructor (prng) {
    this.prng = prng

    this.consonants = []
    let nConsonants = 8 + prng.randInt(12) + prng.randInt(12)
    for (var i = 0; i < nConsonants; ++i) {
      this.consonants.push(this.newConsonant())
    }
  }

  newConsonant () {
    let candidate

    do {
      let place = this.prng.randInt(Consonant.PLACES)
      let manner = Consonant.Consonant.getMannerFromPlace(place, this.prng)
      let voicing = Consonant.Consonant.getVoicingFromManner(manner, this.prng)
      candidate = new Consonant.Consonant(place, manner, voicing)
    } while (!candidate.isValid() || this.exists(candidate))
    return candidate
  }

  exists (consonant) {
    for (let i = 0; i < this.consonants.length; i++) {
      if (consonant.equals(this.consonants[i])) {
        return true
      }
    }
    return false
  }

  toStrings () {
    let results = []
    this.consonants.forEach(function (entry) {
      results.push(entry.description())
    })
    return results
  }

  makeChart () {
    let chart = []

    // make headers
    chart.push(Consonant.PLACE_NAMES.slice())

    for (let manner = 0; manner < Consonant.MANNERS; manner++) {
      let mannerRow = [Consonant.MANNER_NAMES[manner]]

      for (let place = 0; place < Consonant.PLACES; place++) {
        let placeCell = []

        for (let voicing = 0; voicing < Consonant.VOICINGS; voicing++) {
          let thisConsonant = new Consonant.Consonant(place, manner, voicing)
          if (this.exists(thisConsonant)) {
            placeCell.push(thisConsonant.toIPA())
          } else {
            placeCell.push('')
          }
        }
        mannerRow.push(placeCell)
      }
      chart.push(mannerRow)
    }
    return chart
  }
}
