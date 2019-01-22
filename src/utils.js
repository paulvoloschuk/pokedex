export const capitalize = ([firstLetter, ...restLetters]) =>
  firstLetter.toUpperCase() + restLetters.join('')
