import get from './get.js'

/**
 * Checks whether metadata for a given target and key exists in the store.
 *
 * Features:
 * - Supports nested keys using dot notation (`a.b.c`).
 * - Returns `true` if metadata exists, otherwise `false`.
 *
 * @param {Map<string, any>} store
 *   The metadata store.
 * @param {Map<any, string> | WeakMap<object, string>} targets
 *   Map or WeakMap mapping targets to their unique keys.
 * @param {{ count: number }} targetCounterRef
 *   Reference counter for targets (used by key generation).
 * @param {Object|Function} target
 *   The target whose metadata is being checked.
 * @param {string} key
 *   The metadata key (supports nested access with dot notation).
 * @returns {boolean}
 *   `true` if the metadata exists, otherwise `false`.
 *
 * @example
 * has(store, targets, counter, myFunc, "config.apiKey") // true or false
 */
export default function has(store, targets, targetCounterRef, target, key) {
  return get(store, targets, targetCounterRef, target, key) !== undefined
}
