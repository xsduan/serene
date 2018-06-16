import React, { Component } from 'react'

import Consonant from './consonant'

import { consonants } from './phonology.json'

export class ConsonantChart extends Component {
  render () {
    // we could use a library, but this is mostly static so it's not quite worth
    // the effort.
    let names = consonants.names
    let placeCount = names.places.length
    let mannerCount = names.manners.length
    let voicingCount = names.voicings.length

    return (
      <table>
        <thead>
          <tr>
            <th />
            {[...Array(placeCount).keys()].map(p => (
              <th scope="column">{names.places[p]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(mannerCount).keys()].map(m =>
            [...Array(voicingCount).keys()].map(v => (
              <tr>
                {v === 0 ? (
                  <th scope="row" rowSpan={2}>
                    {names.manners[m]}
                  </th>
                ) : null}
                {[...Array(placeCount).keys()].map(p => (
                  <td>
                    {Consonant.valid(m, p, v) ? (
                      <React.Fragment>
                        <span>
                          {[false, true].map(a => (
                            <Consonant
                              key={`Consonant:${m}:${p}:${v}:${a}`}
                              manner={m}
                              place={p}
                              voicing={v}
                              aspirated={a}
                            />
                          ))}
                        </span>
                        <br />
                      </React.Fragment>
                    ) : null}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    )
  }
}
