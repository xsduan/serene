import { consonants } from '../consts/phonology.json'

const _consonantNameMappings = null

const consonantNameMappings = () => {
  return (_consonantNameMappings =
    _consonantNameMappings || remap(consonants.names))
}

function remap (obj) {
  Object.entries(obj).reduce(
    (acc, [aspect, values]) =>
      Object.assign(acc, {
        [aspect]: values.reduce(
          (obj, name, index) => Object.assign(obj, { [name]: index }),
          {}
        )
      }),
    {}
  )
}

function mapNames (arr, aspect) {
  return arr.map(name => consonantNameMappings[aspect][name])
}

function mannerFromPlace (place, prng) {
  let { places, manners } = consonantNameMappings()
  if (place === places.velar) {
    return prng.randElem(
      mapNames(
        [
          'stop',
          'fricative',
          'approximant',
          'nasal',
          'lateral approximant',
          'lateral fricative'
        ],
        'manners'
      )
    )
  }

  let limit = 0
  if (place >= places.dental && place <= places.uvular) {
    limit = manners['lateral fricative']
  }

  if (place <= places.labiodental) {
    limit = manners.nasal
  }

  switch (place) {
    case places.pharyngeal:
    case places.epiglottal:
      limit = manners.tap
      break
    case places.glottal:
      limit = manners.approximant
      break
  }

  return prng.randInt(limit + 1)
}

function voicingFromManner (manner, prng) {
  let { manners } = consonantNameMappings()

  let distribution = [1]
  switch (manner) {
    case manners.stop:
      distribution = [6, 3, 1]
      break
    case manners.fricative:
    case manners['lateral fricative']:
      distribution = [13, 2, 1]
      break
    case manners.approximant:
    case manners['lateral approximant']:
    case manners.trill:
    case manners.tap:
    case manners.nasal:
      distribution = [1, 24, 0.1]
      break
  }
  let result = prng.randIntWeighted(distribution)
  return result === 2 ? [result, false] : [0, true]
}

/**
 * Generates a (place, manner, voicing, aspirated) tuple from a prng.
 */
export function generateConsonant (prng) {
  let place = prng.randInt(consonants.names.places.length)
  let manner = mannerFromPlace(place, prng)
  let [voicing, aspirated] = voicingFromManner(manner, prng)
  return [place, manner, voicing, aspirated]
}

/**
 * Generates a completely random set of consonants.
 */
export function generatePhonology (prng) {
  // yes it's stateful get over it
  let number = 8 + prng.randInt(12) + prng.randInt(12)

  let consonants = {}
  while (Object.keys(consonants) < number) {
    // certainly this could be problematic but since we know they're only
    // going to be numbers this method works fine for our purposes
    let consonant = generateConsonant(prng)
    consonants[consonant] = consonant
  }

  return Object.values(consonants)
}
