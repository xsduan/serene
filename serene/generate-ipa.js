'use strict'

function generateIPA (phonology) {
  let range = document.createRange()
  // let rawVowels = `<table><tr><th><th colspan=2>Front<th colspan=2>Near-front<th colspan=2>Central<th colspan=2>Near-back<th colspan=2>Back<tr><th>High<td><span>i</span><td><span>y</span><td><span>💩</span><td><span>💩</span><td><span>ɨ</span><td><span>ʉ</span><td><span>💩</span><td><span>💩</span><td><span>ɯ</span><td><span>u</span><tr><th>Near-High<td><span>💩</span><td><span>💩</span><td><span>ɪ</span><td><span>ʏ</span><td><span>💩</span><td><span>💩</span><td colspan=2><span>ʊ</span><td><span>💩</span><td><span>💩</span><tr><th>Mid-High<td><span>e</span><td><span>ø</span><td><span>💩</span><td><span>💩</span><td><span>ɘ</span><td><span>ɵ</span><td><span>💩</span><td><span>💩</span><td><span>ɤ</span><td><span>o</span><tr><th>Mid<td><span>💩</span><td><span>💩</span><td><span>💩</span><td><span>💩</span><td colspan=2><span>ə</span><td><span>💩</span><td><span>💩</span><td><span>💩</span><td><span>💩</span><tr><th>Mid-Low<td><span>ɛ</span><td><span>œ</span><td><span>💩</span><td><span>💩</span><td><span>ɜ</span><td><span>ɞ</span><td><span>💩</span><td><span>💩</span><td><span>ʌ</span><td><span>ɔ</span><tr><th>Near-Low<td><span>💩</span><td><span>💩</span><td colspan=2><span>æ</span><td colspan=2><span>ɐ</span><td><span>💩</span><td><span>💩</span><td><span>💩</span><td><span>💩</span><tr><th>Low<td><span>💩</span><td><span>💩</span><td><span>💩</span><td><span>💩</span><td><span>a</span><td><span>œ</span><td><span>💩</span><td><span>💩</span><td><span>ɑ</span><td><span>ɒ</span></table>`

  // add phonemes to chart

  // consonants
  let html = '<table>' +
    '<tr><th><th>Labial<th>Labiodental<th>Dental<th>Alveolar<th>Postalveolar<th>Retroflex<th>Palatal<th>Velar<th>Uvular<th>Pharyngeal<th>Epiglottal<th>Glottal<tr>'
  for (let manner = 0; manner < MANNER_NAMES.length; manner++) {
    html += '<tr><th>' + MANNER_NAMES[manner] + '</th>'
    for (let place = 0; place < PLACE_NAMES.length; place++) {
      html += '<td>'
      for (let voicing = 0; voicing < 2; voicing++) {
        html += '<span>'
        let thisConsonant = new Consonant(place, manner, voicing)
        if (phonology.exists(thisConsonant)) {
          html += thisConsonant.toIPA()
        } else {
          html += '&nbsp;'
        }
        html += '</span>&nbsp;'
      }
    }
  }
  html += '</table>'

  // TODO: vowels
  return range.createContextualFragment(html)
}
