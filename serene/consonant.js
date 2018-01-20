exports.Consonant = class Consonant {
  constructor (place, manner, voicing) {
    this.place = place
    this.manner = manner
    this.voicing = voicing
  }

  description () {
    return [
      exports.VOICING_NAMES[this.voicing],
      exports.PLACE_NAMES[this.place],
      exports.MANNER_NAMES[this.manner]
    ].join(' ')
  }

  toIPA () {
    if (this.voicing === exports.V_ASPIRATED) {
      let voiceless = exports.consonantIPA[2 * (this.place + exports.PLACE_NAMES.length * this.manner)]
      if (voiceless !== '') {
        return voiceless + 'ʰ'
      } else {
        return ''
      }
    }
    return exports.consonantIPA[this.voicing + 2 * (this.place + exports.PLACE_NAMES.length * this.manner)]
  }

  isValid () {
    return this.toIPA() !== ''
  }

  equals (other) {
    return this.place === other.place &&
    this.manner === other.manner &&
    this.voicing === other.voicing
  }

  /**
   * Get manner with real-world distribution from place
   *
   * @param {Int} place
   * @param {PrngUtils} prng PRNG (for determinism)
   */
  static getMannerFromPlace (place, prng) {
    if (place === exports.PL_VELAR) {
      return prng.randElem([exports.MN_STOP, exports.MN_FRICATIVE, exports.MN_NASAL,
        exports.MN_APPROXIMANT, exports.MN_LATERAL_APPROXIMANT, exports.MN_LATERAL_FRICATIVE])
    } else if (place >= exports.PL_DENTAL && place <= exports.PL_UVULAR) {
      return prng.randInt(exports.MN_LATERAL_FRICATIVE + 1)
    } else if (place <= exports.PL_LABIODENTAL) {
      return prng.randInt(exports.MN_NASAL + 1)
    } else if (place === exports.PL_PHARYNGEAL || place === exports.PL_EPIGLOTTAL) {
      return prng.randInt(exports.MN_TAP + 1)
    } else if (place === exports.PL_GLOTTAL) {
      return prng.randInt(exports.MN_APPROXIMANT + 1)
    }
  }

  /**
   * Get voicing from real-world distribution based on manner
   *
   * @param {Int} manner
   * @param {PrngUtils} prng PRNG (for determinism)
   */
  static getVoicingFromManner (manner, prng) {
    switch (manner) {
      case exports.MN_STOP:
        return prng.randIntWeighted([6, 3, 1])
      case exports.MN_FRICATIVE:
      case exports.MN_LATERAL_FRICATIVE:
        return prng.randIntWeighted([13, 2, 1])
      case exports.MN_APPROXIMANT:
      case exports.MN_LATERAL_APPROXIMANT:
      case exports.MN_TRILL:
      case exports.MN_TAP:
      case exports.MN_NASAL:
        return prng.randIntWeighted([1, 24, 0.1])
    }
  }
}

exports.PL_LABIAL = 0
exports.PL_LABIODENTAL = 1
exports.PL_DENTAL = 2
exports.PL_ALVEOLAR = 3
exports.PL_POSTALVEOLAR = 4
exports.PL_RETROFLEX = 5
exports.PL_PALATAL = 6
exports.PL_VELAR = 7
exports.PL_UVULAR = 8
exports.PL_PHARYNGEAL = 9
exports.PL_EPIGLOTTAL = 10
exports.PL_GLOTTAL = 11
exports.PLACE_NAMES = [
  'labial', 'labiodental', 'dental',
  'alveolar', 'postalveolar', 'retroflex',
  'palatal', 'velar', 'uvular', 'pharyngeal',
  'epiglottal', 'glottal'
]

exports.MN_STOP = 0
exports.MN_FRICATIVE = 1
exports.MN_APPROXIMANT = 2
exports.MN_TRILL = 3
exports.MN_TAP = 4
exports.MN_NASAL = 5
exports.MN_LATERAL_APPROXIMANT = 6
exports.MN_LATERAL_FRICATIVE = 7
exports.MANNER_NAMES = [
  'stop', 'fricative', 'approximant',
  'trill', 'tap', 'nasal',
  'lateral approximant', 'lateral fricative'
]

exports.V_VOICELESS = 0
exports.V_VOICED = 1
exports.V_ASPIRATED = 2
exports.VOICING_NAMES = [
  'voiceless', 'voiced', 'aspirated'
]

exports.PLACES = exports.PLACE_NAMES.length
exports.MANNERS = exports.MANNER_NAMES.length
exports.VOICINGS = exports.VOICING_NAMES.length

exports.consonantIPA = ['p', 'b', 'p̪', 'b̪', 't̪', 'd̪', 't', 'd', 't̠', 'd̠', 'ʈ', 'ɖ', 'c', 'ɟ', 'k', 'g', 'q', 'g', '', '', 'ʡ', 'ʡ̬', 'ʔ', '',
  'ɸ', 'β', 'f', 'v', 'θ', 'ð', 's', 'z', 'ʃ', 'ʒ', 'ʂ', 'ʐ', 'ç', 'ʝ', 'x', 'ɣ', 'χ', 'ʁ', 'ħ', 'ʕ', 'ʢ̥', 'ʢ', 'h', 'ɦ',
  'ɸ̞', 'β̞', 'ʋ̥', 'ʋ', 'θ̞', 'ð̞', 'ɹ̥', 'ɹ', 'ɹ̠̊', 'ɹ̠', 'ɻ̥', 'ɻ', 'j̊', 'j', 'ɰ̊', 'ɰ', 'χ̞', 'ʁ̞', 'ħ̞', 'ʕ̞', 'ʢ̞̊', 'ʢ̞', 'h̞', 'ɦ̞',
  'ʙ̥', 'ʙ', 'ʙ̪̊', 'ʙ̪', 'r̪̊', 'r̪', 'r̥', 'r', 'r̠̊', 'r̠', 'ɽ̊ɽ̊', 'ɽɽ', '', '', '', '', 'ʀ̥', 'ʀ', '', '', 'ʜ', 'ʢ', '', '',
  'ⱱ̟̊', 'ⱱ̟', 'ⱱ̥', 'ⱱ', 'ɾ̪̊', 'ɾ̪', 'ɾ̥', 'ɾ', 'ɾ̠̊', 'ɾ̠', 'ɽ̊', 'ɽ', '', '', '', '', 'ɢ̥̆', 'ɢ̆', '', '', 'ʡ̮̊', 'ʡ̮', '', '',
  'm̥', 'm', 'ɱ̊', 'ɱ', 'n̪̊', 'n̪', 'n̥', 'n', 'n̠̊', 'n̠', 'ɳ̊', 'ɳ', 'ɲ̊', 'ɲ', 'ŋ̊', 'ŋ', 'ɴ̥', 'ɴ', '', '', '', '', '',
  '', '', '', '', '', 'l̪̊', 'l̪', 'l̥', 'l', 'l̠̊', 'l̠', 'ɭ̥', 'ɭ', 'ʎ̥', 'ʎ', 'ʟ̥', 'ʟ', 'ʟ̠̊', 'ʟ̠', '', '', '', '', '', '',
  '', '', '', '', 'ɬ̪', 'ɮ̪', 'ɬ', 'ɮ', 'ɬ̠', 'ɮ̠', 'ɭ̥̝', 'ɭ̝', 'ʎ̥̝', 'ʎ̝', 'ʟ̥̝', 'ʟ̝', 'ʟ̠̝̊', 'ʟ̠̝', '', '', '', '', '', '']
