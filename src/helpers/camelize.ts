export function camelize(str: string) {
  return str
    .replace(/[\s_-]+(\w)/g, function (match, firstLetter) {
      return firstLetter.toUpperCase();
    }) 
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}
