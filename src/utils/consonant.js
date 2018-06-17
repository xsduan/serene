import {
  names as consonantNames,
  ipa as consonantIpa
} from '../consts/consonants.json'

export function name (m, p, v, a = false) {
  let unaspirated = [
    consonantNames.voicings[v],
    consonantNames.places[p],
    consonantNames.manners[m]
  ].join(' ')
  return a ? `${consonantNames.aspiration[v]} ${unaspirated}` : unaspirated
}

export function ipa (m, p, v, a = false) {
  let raw = consonantIpa.main[m][p][v].letter
  return a ? `${raw}${consonantIpa.modifiers.aspiration[v]}` : raw
}

export function valid (m, p, v, a = false) {
  let ipa = consonantIpa.main[m][p][v]
  return !!(ipa && ipa.letter && (!a || ipa.aspirated))
}
