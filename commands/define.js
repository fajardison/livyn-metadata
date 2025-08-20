import deepFreeze from '../helpers/deepFreeze.js'
import getTargetKey from '../helpers/getTargetKey.js'

/**
 * Store metadata on a given target (object/function) into the store.
 *
 * @function define
 * @param {Map|Object} store - The metadata storage that supports methods `get`, `set`, `has`, and `delete`.
 * @param {WeakMap} targets - A collection of targets used to generate a unique key.
 * @param {{ current: number }} targetCounterRef - A reference counter for generating unique target IDs.
 * @param {Object|Function} target - The target to assign metadata to.
 * @param {string} key - The metadata key name. Supports dot notation (`a.b.c`) for nested metadata.
 * @param {*} value - The metadata value to store.
 * @param {Object} [options={}] - Additional options for storing metadata.
 * @param {boolean} [options.overwrite=true] - If `false`, throws an error when the key already exists.
 * @param {boolean} [options.freeze=true] - If `true`, the metadata will be frozen (immutable) using `deepFreeze`.
 * @param {boolean} [options.merge=false] - If `true`, merges existing metadata (shallow) with the new value (only for objects).
 * @param {number} [options.ttl] - Time-to-live in milliseconds. Once expired, the metadata will be automatically removed.
 *
 * @throws {Error} - If `target` is not an object/function or `key` is not a string.
 * @throws {Error} - If `overwrite=false` and metadata with the same key already exists.
 *
 * @returns {boolean} - Returns `true` if metadata was successfully stored.
 *
 * @example
 * const store = new Map()
 * const targets = new WeakMap()
 * const counter = { current: 0 }
 *
 * function myFunc() {}
 *
 * define(store, targets, counter, myFunc, "config.apiKey", "12345", { freeze: true })
 * // The metadata "config.apiKey" for myFunc is now stored in the store
 */
export default function define(store, targets, targetCounterRef, target, key, value, options = {}) {
  const { overwrite = true, freeze = true, merge = false, ttl } = options

  if (!target || (typeof target !== 'object' && typeof target !== 'function'))
    throw new Error('Target must be an object or function')
  if (typeof key !== 'string') throw new Error('Key must be a string')

  const targetKey = getTargetKey(target, targets, targetCounterRef)
  let metadata = store.get(targetKey) || {}
  let targetMeta = metadata

  const parts = key.split('.')
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i]
    targetMeta[part] = targetMeta[part] || {}
    targetMeta = targetMeta[part]
  }

  const lastKey = parts[parts.length - 1]

  if (Object.prototype.hasOwnProperty.call(targetMeta, lastKey)) {
    if (!overwrite) throw new Error(`Metadata for key "${key}" already exists`)
    if (merge && typeof targetMeta[lastKey] === 'object' && typeof value === 'object') {
      targetMeta[lastKey] = { ...targetMeta[lastKey], ...value }
    } else {
      targetMeta[lastKey] = value
    }
  } else {
    targetMeta[lastKey] = value
  }

  if (freeze) deepFreeze(targetMeta[lastKey])
  store.set(targetKey, metadata)

  if (ttl && typeof ttl === 'number') {
    const ttlKey = `${targetKey}:${key}`
    store.set(ttlKey, targetMeta[lastKey], ttl)

    const timeout = setTimeout(() => {
      const meta = store.get(targetKey)
      if (!meta) return
      let obj = meta
      for (let i = 0; i < parts.length - 1; i++) obj = obj[parts[i]]
      if (obj && obj[lastKey] !== undefined) {
        delete obj[lastKey]
        store.set(targetKey, meta)
      }
      if (store.has(ttlKey)) store.delete(ttlKey)
    }, ttl)

    if (timeout.unref) timeout.unref()
  }

  return true
}
