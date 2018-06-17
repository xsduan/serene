import { consonants } from '../consts/phonology.json'

let _consonantNameMappings = null

export const consonantNameMappings = () => {
  _consonantNameMappings = _consonantNameMappings || remap(consonants.names)
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
