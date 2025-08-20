import getTargetName from '../helpers/getTargetName.js'
import search from '../helpers/search.js'

/**
 * Searches metadata in the store by a given key name.
 *
 * Features:
 * - Supports nested keys.
 * - Allows exact or partial matching.
 * - Supports case-insensitive search.
 *
 * @param {Map<string, any>} store - Metadata store.
 * @param {Map<any, string> | WeakMap<object, string>} targets - A map of targets to their keys.
 * @param {{ count: number }} targetCounterRef - Target counter, used internally by getTargetKey.
 * @param {string} searchKey - The key to search for.
 * @param {Object} [options] - Search options.
 * @param {boolean} [options.exact=false] - If true, matches the key exactly.
 * @param {boolean} [options.ignoreCase=false] - If true, the search is case-insensitive.
 * @param {boolean} [options.firstOnly=false] - If true, returns only the first match.
 *
 * @returns {Array<{ target: string, key: string, value: any }>} 
 * An array of matching results, each containing:
 *  - target: The name of the target.
 *  - key: The matched key path.
 *  - value: The corresponding metadata value.
 *
 * @example
 * findByKey(store, targets, counter, "apiKey") 
 * // -> returns all matches where key contains "apiKey"
 *
 * findByKey(store, targets, counter, "config", { exact: true }) 
 * // -> returns only exact matches for "config"
 *
 * findByKey(store, targets, counter, "token", { ignoreCase: true, firstOnly: true }) 
 * // -> returns the first case-insensitive match for "token"
 */

export default function findByKey(store, targets, targetCounterRef, searchKey, { exact = false, ignoreCase = false, firstOnly = false } = {}) {
  if (typeof searchKey !== 'string') searchKey = String(searchKey)

  const result = []

  for (const [target, key] of targets.entries()) {
    const metadata = store.get(key)
    if (!metadata) continue

    const stop = search(metadata, (k, v, path) => {
      let keyToCheck = ignoreCase ? k.toLowerCase() : k
      let searchStr = ignoreCase ? searchKey.toLowerCase() : searchKey

      if ((exact && keyToCheck === searchStr) || (!exact && keyToCheck.includes(searchStr))) {
        result.push({ target: getTargetName(target), key: path, value: v })
        return !firstOnly // return false untuk berhenti jika firstOnly=true
      }
    })

    if (firstOnly && result.length > 0) break
  }

  return result
}
