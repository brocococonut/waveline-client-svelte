/**
 * Push elements to an array and return it
 * @param {[any]} arr Array to add to
 * @param  {...any} els Elements to add to array
 */
export const push = (arr, ...els) => {
  arr.push(...els)
  return arr
}

/**
 * Push elements to the start of an array and return it
 * @param {[any]} arr Array to add to
 * @param  {...any} els Elements to add to array
 */
export const unshift = (arr = [], ...els) => {
  arr.unshift(...els)
  return arr
}

/**
 * Replace an index of an array with another element
 * @param {[any]} arr Array to modify
 * @param {number} ind Index to replace
 * @param {any} el Array element to replace index with
 */
export const set = (arr = [], ind = 0, el) => {
  arr[ind] = el
  return arr
}

/**
 * Remove duplicates from an array
 * @param {[any]} arr Array to make a set of
 */
export const removeDuplicates = (arr = []) => {
  arr.splice(0, arr.length, ...(new Set(arr)))
};