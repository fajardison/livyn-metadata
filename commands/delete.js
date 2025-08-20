import getTargetKey from '../helpers/getTargetKey.js'

/**
 * Removes metadata from the store for a given target.
 *
 * Features:
 * - If `key` is not provided, removes all metadata for the target:
 *   - Deletes the main entry from the store.
 *   - Removes the target mapping from `targets`.
 *   - Deletes all nested keys with the prefix `targetKey:`.
 * - If `key` is provided:
 *   - Deletes specific metadata using dot notation (`a.b.c`) for nested keys.
 *   - Removes the associated TTL entry (`targetKey:key`) if it exists.
 *
 * @param {Map<string, any>} store
 *   The main store containing metadata key-value pairs.
 * @param {Map<any, string> | WeakMap<object, string>} targets
 *   Map or WeakMap mapping each target to its unique key.
 * @param {{ count: number }} targetCounterRef
 *   Reference to the target counter, used by `getTargetKey`.
 * @param {Object|Function} target
 *   The target whose metadata should be removed.
 * @param {string} [key]
 *   Specific metadata key to remove (optional). Supports dot notation (`a.b.c`).
 *
 * @returns {boolean}
 *   `true` if deletion was successful (or something was removed), `false` if the key was not found.
 *
 * @example
 * remove(store, targets, counter, myFunc, "config.apiKey")  // remove a specific metadata key
 * remove(store, targets, counter, myFunc)                  // remove all metadata for a target
 */
export default function remove(store, targets, targetCounterRef, target, key) {
  const targetKey = getTargetKey(target, targets, targetCounterRef)
  if (!store.has(targetKey)) return false

  if (!key) {
    store.delete(targetKey)
    targets.delete(target)
    const prefix = targetKey + ':'
    for (const k of store.keys()) {
      if (typeof k === 'string' && k.startsWith(prefix)) store.delete(k)
    }
    return true
  }

  const metadata = store.get(targetKey)
  const parts = key.split('.')
  let obj = metadata
  for (let i = 0; i < parts.length - 1; i++) {
    obj = obj[parts[i]]
    if (!obj) return false
  }
  const deleted = delete obj[parts[parts.length - 1]]
  store.set(targetKey, metadata)

  const ttlKey = `${targetKey}:${key}`
  if (store.has(ttlKey)) store.delete(ttlKey)

  return deleted
}
