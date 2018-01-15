'use strict'

const consonants = ['p', 'b', 'p̪', 'b̪', 't̪', 'd̪', 't', 'd', 't̠', 'd̠', 'ʈ', 'ɖ', 'c', 'ɟ', 'k', 'g', 'q', 'g', '', '', 'ʡ', 'ʡ̬', 'ʔ', '',
  'ɸ', 'β', 'f', 'v', 'θ', 'ð', 's', 'z', 'ʃ', 'ʒ', 'ʂ', 'ʐ', 'ç', 'ʝ', 'x', 'ɣ', 'χ', 'ʁ', 'ħ', 'ʕ', 'ʢ̥', 'ʢ', 'h', 'ɦ',
  'ɸ̞', 'β̞', 'ʋ̥', 'ʋ', 'θ̞', 'ð̞', 'ɹ̥', 'ɹ', 'ɹ̠̊', 'ɹ̠', 'ɻ̥', 'ɻ', 'j̊', 'j', 'ɰ̊', 'ɰ', 'χ̞', 'ʁ̞', 'ħ̞', 'ʕ̞', 'ʢ̞̊', 'ʢ̞', 'h̞', 'ɦ̞',
  'ʙ̥', 'ʙ', 'ʙ̪̊', 'ʙ̪', 'r̪̊', 'r̪', 'r̥', 'r', 'r̠̊', 'r̠', 'ɽ̊ɽ̊', 'ɽɽ', '', '', '', '', 'ʀ̥', 'ʀ', '', '', 'ʜ', 'ʢ', '', '',
  'ⱱ̟̊', 'ⱱ̟', 'ⱱ̥', 'ⱱ', 'ɾ̪̊', 'ɾ̪', 'ɾ̥', 'ɾ', 'ɾ̠̊', 'ɾ̠', 'ɽ̊', 'ɽ', '', '', '', '', 'ɢ̥̆', 'ɢ̆', '', '', 'ʡ̮̊', 'ʡ̮', '', '',
  'm̥', 'm', 'ɱ̊', 'ɱ', 'n̪̊', 'n̪', 'n̥', 'n', 'n̠̊', 'n̠', 'ɳ̊', 'ɳ', 'ɲ̊', 'ɲ', 'ŋ̊', 'ŋ', 'ɴ̥', 'ɴ', '', '', '', '', '',
  '', '', '', '', '', 'l̪̊', 'l̪', 'l̥', 'l', 'l̠̊', 'l̠', 'ɭ̥', 'ɭ', 'ʎ̥', 'ʎ', 'ʟ̥', 'ʟ', 'ʟ̠̊', 'ʟ̠', '', '', '', '', '', '',
  '', '', '', '', 'ɬ̪', 'ɮ̪', 'ɬ', 'ɮ', 'ɬ̠', 'ɮ̠', 'ɭ̥̝', 'ɭ̝', 'ʎ̥̝', 'ʎ̝', 'ʟ̥̝', 'ʟ̝', 'ʟ̠̝̊', 'ʟ̠̝', '', '', '', '', '', '']

function generateIPA (phonology) {
  let range = document.createRange()
  // let rawVowels = `<table><tr><th><th colspan=2>Front<th colspan=2>Near-front<th colspan=2>Central<th colspan=2>Near-back<th colspan=2>Back<tr><th>High<td><span>i</span><td><span>y</span><td><span>💩</span><td><span>💩</span><td><span>ɨ</span><td><span>ʉ</span><td><span>💩</span><td><span>💩</span><td><span>ɯ</span><td><span>u</span><tr><th>Near-High<td><span>💩</span><td><span>💩</span><td><span>ɪ</span><td><span>ʏ</span><td><span>💩</span><td><span>💩</span><td colspan=2><span>ʊ</span><td><span>💩</span><td><span>💩</span><tr><th>Mid-High<td><span>e</span><td><span>ø</span><td><span>💩</span><td><span>💩</span><td><span>ɘ</span><td><span>ɵ</span><td><span>💩</span><td><span>💩</span><td><span>ɤ</span><td><span>o</span><tr><th>Mid<td><span>💩</span><td><span>💩</span><td><span>💩</span><td><span>💩</span><td colspan=2><span>ə</span><td><span>💩</span><td><span>💩</span><td><span>💩</span><td><span>💩</span><tr><th>Mid-Low<td><span>ɛ</span><td><span>œ</span><td><span>💩</span><td><span>💩</span><td><span>ɜ</span><td><span>ɞ</span><td><span>💩</span><td><span>💩</span><td><span>ʌ</span><td><span>ɔ</span><tr><th>Near-Low<td><span>💩</span><td><span>💩</span><td colspan=2><span>æ</span><td colspan=2><span>ɐ</span><td><span>💩</span><td><span>💩</span><td><span>💩</span><td><span>💩</span><tr><th>Low<td><span>💩</span><td><span>💩</span><td><span>💩</span><td><span>💩</span><td><span>a</span><td><span>œ</span><td><span>💩</span><td><span>💩</span><td><span>ɑ</span><td><span>ɒ</span></table>`

  // blank out all non-phonemes

  // consonants
  let html = '<table>' +
    '<tr><th><th>Labial<th>Labiodental<th>Dental<th>Alveolar<th>Postalveolar<th>Retroflex<th>Palatal<th>Velar<th>Uvular<th>Pharyngeal<th>Epiglottal<th>Glottal<tr>'
  for (let manner = 0; manner < MANNER_NAMES.length; manner++) {
    html += '<tr><th>' + MANNER_NAMES[manner] + '</th>'
    for (let place = 0; place < PLACE_NAMES.length; place++) {
      html += '<td>'
      for (let voicing = 0; voicing < 2; voicing++) {
        html += '<span>'
        if (phonology.exists(new Consonant(place, manner, voicing))) {
          html += consonants[voicing + 2 * (place + PLACE_NAMES.length * manner)]
        } else {
          html += '&nbsp;'
        }
        html += '</span>'
      }
    }
  }
  html += '</table>'

  // TODO: vowels
  return range.createContextualFragment(html)
}
