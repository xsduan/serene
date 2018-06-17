import { consonants } from '../consts/phonology.json'

export function name (m, p, v, a = false) {
  let names = consonants.names
  let unaspirated = [names.voicings[v], names.places[p], names.manners[m]].join(
    ' '
  )
  return a ? `${names.aspiration[v]} ${unaspirated}` : unaspirated
}

export function ipa (m, p, v, a = false) {
  let raw = consonants.ipa.main[m][p][v].letter
  return a ? `${raw}${consonants.ipa.modifiers.aspiration[v]}` : raw
}

export function valid (m, p, v, a = false) {
  let ipa = consonants.ipa.main[m][p][v]
  return !!(ipa && ipa.letter && (!a || ipa.aspirated))
}
