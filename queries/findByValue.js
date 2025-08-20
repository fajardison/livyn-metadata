import getTargetName from '../helpers/getTargetName.js'
import search from '../helpers/search.js'

/**
 * Searches metadata within the store by matching values using a predicate function.
 *
 * Features:
 * - Supports searching through nested metadata structures.
 * - The predicate function receives `(value, key, path)` and should return `true` if the value matches.
 * - Can optionally stop after the first match if `firstOnly` is set to `true`.
 *
 * @param {Map<string, any>} store
 *   The metadata store.
 * @param {Map<any, string> | WeakMap<object, string>} targets
 *   Map or WeakMap mapping targets to their unique string keys.
 * @param {{ count: number }} targetCounterRef
 *   A reference counter used to manage target mappings.
 * @param {(value: any, key: string, path: string) => boolean} predicate
 *   A function used to test each value. Should return `true` when a match is found.
 * @param {Object} [options]
 *   Additional search options.
 * @param {boolean} [options.firstOnly=false]
 *   If `true`, stops the search and returns only the first matching result.
 *
 * @returns {Array<{ target: string, key: string, value: any }>}
 *   A list of matching results, each containing:
 *   - `target`: the target’s name.
 *   - `key`: the metadata path where the value was found.
 *   - `value`: the matching metadata value.
 *
 * @throws {Error}
 *   If the provided predicate is not a function.
 *
 * @example
 * // Find all metadata values that are numbers greater than 100
 * findByValue(store, targets, counter, (v) => typeof v === 'number' && v > 100)
 *
 * @example
 * // Find the first metadata value that contains a specific string
 * findByValue(store, targets, counter, (v) => typeof v === 'string' && v.includes('token'), { firstOnly: true })
 */
export default function findByValue(store, targets, targetCounterRef, predicate, { firstOnly = false } = {}) {
  if (typeof predicate !== 'function') throw new Error('Predicate must be a function')

  const result = []

  for (const [target, key] of targets.entries()) {
    const metadata = store.get(key)
    if (!metadata) continue

    const stop = search(metadata, (k, v, path) => {
      if (predicate(v, k, path)) {
        result.push({ target: getTargetName(target), key: path, value: v })
        return !firstOnly // return false to stop if firstOnly=true
      }
    })

    if (firstOnly && result.length > 0) break
  }

  return result
}
