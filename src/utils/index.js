import { names as consonantNames } from '../consts/consonants.json'

let _consonantNameMappings = null

export function consonantNameMappings () {
  _consonantNameMappings = _consonantNameMappings || remap(consonantNames)
  return _consonantNameMappings
}

function remap (obj) {
  return Object.entries(obj).reduce(
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
