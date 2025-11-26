export function removeAccent(text: string) {
  return text.normalize('NFD').replaceAll(/[\u0300-\u036F]/g, '')
}

export function normalizePath(text: string) {
  let result = removeAccent(text)
    .replaceAll(/[^\w]+/, '_')
    .toLowerCase()

  while (result.startsWith('_'))
    result = result.slice(1)

  while (result.endsWith('_'))
    result = result.slice(0, -1)

  return result
}

export function isUpperCase(text: string) {
  return text.localeCompare(text.toUpperCase()) === 0
}

export function toSnakeCase(name: string) {
  name = name.replaceAll(/(.)([A-Z][a-z]+)/g, '$1_$2')
  name = name.replaceAll(/__([A-Z])/g, '_$1')
  name = name.replaceAll(/([\da-z])([A-Z])/g, '$1_$2')
  return name.toLowerCase()
}

export function titleCase(string_: string) {
  const splitString = string_.toLowerCase().split(' ')
  for (let index = 0; index < splitString.length; index++)
    splitString[index] = splitString[index].charAt(0).toUpperCase() + splitString[index].slice(1)

  return splitString.join(' ')
}
