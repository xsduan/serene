import React from 'react'

import Consonant from './consonant'

import { valid } from '../utils/consonant'

import { names as consonantNames } from '../consts/consonants.json'

export function ConsonantChart ({ phonology }) {
  // we could use a library, but this is mostly static so it's not quite worth
  // the effort.
  let { places, manners, voicings } = consonantNames

  let placeCount = places.length
  let mannerCount = manners.length
  let voicingCount = voicings.length

  return (
    <table>
      <thead>
        <tr>
          <th />

          {[...Array(placeCount).keys()].map(p => (
            <th key={p} scope="column" colSpan={2}>
              {consonantNames.places[p]}
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
                  {consonantNames.manners[m]}
                </th>
              ) : null}

              {[...Array(placeCount).keys()].map(p =>
                [false, true].map(a => {
                  let consonantTuple = [m, p, v, a]

                  return (
                    <td key={a}>
                      {phonology[consonantTuple] ? (
                        <Consonant
                          key={`Consonant:${m}:${p}:${v}:${a}`}
                          manner={m}
                          place={p}
                          voicing={v}
                          aspirated={a}
                        />
                      ) : valid(...consonantTuple) ? (
                        <span />
                      ) : null}
                    </td>
                  )
                })
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}
