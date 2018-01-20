'use strict'

function generate (phonology) {
  let range = document.createRange()
  let html = ''

  let lang = serene.generate()

  html += '<div>Seed: ' + lang[0] + '</div>'

  // consonants
  let phono = lang[1]
  html += '<table><tr><th><th>'

  // header
  html += phono[0].join('<th>')
  phono = phono.slice(1)

  phono.forEach(function (row) {
    html += '<tr>'

    // sider
    html += '<th>' + row[0]
    row = row.slice(1)

    row.forEach(function (cell) {
      html += '<td>'
      cell.forEach(function (entry) {
        // force blank space
        if (entry === '') {
          entry = '&nbsp;'
        }

        html += '<span>' + entry + '</span>'
      })
    })
  })

  html += '</table>'

  // TODO: vowels
  return range.createContextualFragment(html)
}
