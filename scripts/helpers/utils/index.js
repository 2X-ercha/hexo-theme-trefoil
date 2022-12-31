function trim(strings, ...args) {
  const array = [strings[0]]
  for (let i = 0; i < args.length; i++) {
    array.push(args[i], strings[i + 1])
  }
  return array.map(it => it.split('\n'))
    .flat()
    .map(it => it.trim())
    .join('')
}

module.exports = {
  trim
}