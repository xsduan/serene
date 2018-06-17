import React, { Component } from 'react'

import Consonant from './consonant'

import { consonants } from '../consts/phonology.json'

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
              <th key={p} scope="column" colSpan={2}>
                {names.places[p]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(mannerCount).keys()].map(m =>
            [...Array(voicingCount).keys()].map(v => (
              <tr key={`${m}:${v}`}>
                {v === 0 ? (
                  <th scope="row" rowSpan={2}>
                    {names.manners[m]}
                  </th>
                ) : null}
                {[...Array(placeCount).keys()].map(p =>
                  [false, true].map(a => (
                    <td key={a}>
                      {Consonant.valid(m, p, v, a) ? (
                        <Consonant
                          key={`Consonant:${m}:${p}:${v}:${a}`}
                          manner={m}
                          place={p}
                          voicing={v}
                          aspirated={a}
                        />
                      ) : null}
                    </td>
                  ))
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    )
  }
}
