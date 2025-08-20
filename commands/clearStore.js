import getTargetKey from '../helpers/getTargetKey.js'

/**
 * Clears data from the store either for a specific target or entirely.
 *
 * Features:
 * - If a `target` is provided:
 *   - Removes the main entry from the store.
 *   - Removes the target-to-key mapping from `targetsMap`.
 *   - Removes all child entries with the prefix `targetKey:`.
 * - If no `target` is provided:
 *   - Clears the entire store and `targetsMap`.
 *
 * Optimizations:
 * - Performs only one iteration to remove child keys.
 * - Avoids creating temporary arrays (deletes directly in the loop).
 * - Uses early return for simpler flow.
 *
 * @param {Map<string, any>} store
 *   The main Map that stores key-value pairs.
 * @param {Map<any, string> | WeakMap<object, string>} targetsMap
 *   Map or WeakMap mapping targets to their unique keys.
 * @param {{ count: number }} targetCounterRef
 *   Reference counter for targets (used by `getTargetKey`).
 * @param {any} [target]
 *   The specific target to clear (optional).
 *
 * @example
 * clearStore(store, targetsMap, counter, user)   // clears only the user's metadata
 * clearStore(store, targetsMap, counter)
 */
export default function clearStore(store, targetsMap, targetCounterRef, target) {
  if (target == null) {
    store.clear()
    targetsMap.clear()
    return
  }

  const targetKey = getTargetKey(target, targetsMap, targetCounterRef)
  if (typeof targetKey !== 'string') {
    throw new TypeError('targetKey must be a string')
  }

  const prefix = targetKey + ':'

  store.delete(targetKey)
  targetsMap.delete(target)

  for (const key of store.keys()) {
    if (typeof key === 'string' && key.startsWith(prefix)) {
      store.delete(key)
    }
  }
}
