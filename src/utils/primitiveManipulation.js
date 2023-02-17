/* ########################### Strings ########################## */

// Capitalizes the first letter of the string
export function toTitleCase(str) {
  if(str){
    return str[0].toUpperCase() + str.slice(1);
  }
  return
}

// Turns array into string of form X, Y, and Z
export function makeListOfNouns(arr) {
  const len = arr.length;

  // Special case to include the space before "and"
  if (len === 2) {
    return arr[0] + " and " + arr[1];
  }

  return arr.slice(0, len - 1).join(", ") + "and " + arr[len - 1];
}

/* ########################### Arrays ########################## */

// Shuffles the array
// from https://stackoverflow.com/a/12646864
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
