'use strict'

const PL_LABIAL = 0
const PL_LABIODENTAL = 1
const PL_DENTAL = 2
const PL_ALVEOLAR = 3
const PL_POSTALVEOLAR = 4
const PL_RETROFLEX = 5
const PL_PALATAL = 6
const PL_VELAR = 7
const PL_UVULAR = 8
const PL_PHARYNGEAL = 9
const PL_EPIGLOTTAL = 10
const PL_GLOTTAL = 11
const PLACE_NAMES = [
  'labial', 'labiodental', 'dental',
  'alveolar', 'postalveolar', 'retroflex',
  'palatal', 'velar', 'uvular', 'pharyngeal',
  'epiglottal', 'glottal'
]

const MN_STOP = 0
const MN_FRICATIVE = 1
const MN_APPROXIMANT = 2
const MN_TRILL = 3
const MN_TAP = 4
const MN_NASAL = 5
const MN_LATERAL_APPROXIMANT = 6
const MN_LATERAL_FRICATIVE = 7
const MANNER_NAMES = [
  'stop', 'fricative', 'approximant',
  'trill', 'tap', 'nasal',
  'lateral approximant', 'lateral fricative'
]

const V_VOICELESS = 0
const V_VOICED = 1
const V_ASPIRATED = 2
const VOICING_NAMES = [
  'voiceless', 'voiced', 'aspirated'
]

function getMannerFromPlace (place) {
  if (place == PL_VELAR) {
    return randElem([MN_STOP, MN_FRICATIVE, MN_NASAL,
      MN_APPROXIMANT, MN_LATERAL_APPROXIMANT, MN_LATERAL_FRICATIVE])
  } else if (place >= PL_DENTAL && place <= PL_UVULAR) {
    return randInt(MN_LATERAL_FRICATIVE + 1)
  } else if (place <= PL_LABIODENTAL) {
    return randInt(MN_NASAL + 1)
  } else if (place === PL_PHARYNGEAL || place === PL_EPIGLOTTAL) {
    return randInt(MN_TAP + 1)
  } else if (place === PL_GLOTTAL) {
    return randInt(MN_APPROXIMANT + 1)
  }
}

function getVoicingFromManner (manner) {
  switch (manner) {
    case MN_STOP:
      return randIntWeighted([6, 3, 1])
    case MN_FRICATIVE:
    case MN_LATERAL_FRICATIVE:
      return randIntWeighted([13, 2, 1])
    case MN_APPROXIMANT:
    case MN_LATERAL_APPROXIMANT:
    case MN_TRILL:
    case MN_TAP:
    case MN_NASAL:
      return randIntWeighted([24, 1, 0.1])
  }
}

class Consonant {
  constructor (place, manner, voicing) {
    this.place = place
    this.manner = manner
    this.voicing = voicing
  }

  description () {
    return [
      VOICING_NAMES[this.voicing],
      PLACE_NAMES[this.place],
      MANNER_NAMES[this.manner]].join(' ')
  }

  equals (other) {
    return this.place === other.place &&
    this.manner === other.manner &&
    this.voicing === other.voicing
  }
}

class Phonology {
  /*
    consonants
  */
  constructor () {
    this.consonants = []
    let nConsonants = 8 + randInt(12) + randInt(12)
    for (var i = 0; i < nConsonants; ++i) {
      this.consonants.push(this.newConsonant())
    }
  }

  newConsonant () {
    let place = randInt(PL_GLOTTAL + 1)
    let manner = getMannerFromPlace(place)
    let voicing = getVoicingFromManner(manner)
    return new Consonant(place, manner, voicing)
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
}
