import getTargetKey from '../helpers/getTargetKey.js'

/**
 * Retrieves metadata from the store for a specific target.
 *
 * Features:
 * - Supports nested key access using dot notation (`a.b.c`).
 * - Returns `undefined` if the target or the specified key does not exist.
 *
 * @param {Map<string, any>} store
 *   The metadata store.
 * @param {Map<any, string> | WeakMap<object, string>} targets
 *   Map or WeakMap that maps targets to their unique keys.
 * @param {{ count: number }} targetCounterRef
 *   A reference counter used by `getTargetKey` to track target mappings.
 * @param {Object|Function} target
 *   The target object or function whose metadata should be retrieved.
 * @param {string} [key]
 *   Optional nested key in dot notation to retrieve a specific value.
 *   If omitted, the entire metadata object for the target will be returned.
 * @returns {any}
 *   The requested metadata value, or the full metadata object if `key` is not provided.
 *
 * @example
 * // Retrieve a nested metadata value
 * get(store, targets, counter, myFunc, "config.apiKey")
 *
 * // Retrieve the entire metadata object for a target
 * get(store, targets, counter, myFunc)
 */
export default function get(store, targets, targetCounterRef, target, key) {
  const targetKey = getTargetKey(target, targets, targetCounterRef)
  const metadata = store.get(targetKey)
  if (!metadata) return undefined
  if (!key) return metadata
  return key.split('.').reduce((obj, part) => obj && obj[part], metadata)
                   }
