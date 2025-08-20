import getTargetName from '../helpers/getTargetName.js'
import search from '../helpers/search.js'

/**
 * Retrieves all metadata from the store and returns it as a flat array.
 *
 * Features:
 * - Flattens nested metadata into an array of objects `{ target, key, value }`.
 * - Supports nested objects with dot notation for keys.
 * - Useful for searching, inspection, and debugging.
 *
 * @param {Map<string, any>} store
 *   The metadata store.
 * @param {Map<any, string> | WeakMap<object, string>} targets
 *   Map or WeakMap mapping targets to their unique keys.
 * @returns {Array<{ target: string, key: string, value: any }>}
 *   A flat array containing all metadata entries.
 *
 * @example
 * getAllAsArray(store, targets)
 * // [
 * //   { target: "myFunc", key: "config.apiKey", value: "123" },
 * //   { target: "myFunc", key: "config.timeout", value: 5000 }
 * // ]
 */
export default function getAllAsArray(store, targets) {
  const result = []
  for (const [target, key] of targets.entries()) {
    const metadata = store.get(key)
    if (!metadata) continue
    search(metadata, (k, v, path) => {
      result.push({ target: getTargetName(target), key: path, value: v })
    })
  }
  return result
}
