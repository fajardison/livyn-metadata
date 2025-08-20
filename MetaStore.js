import defineCommand from './commands/define.js'
import deleteCommand from './commands/delete.js'
import clearStore from './commands/clearStore.js'

import get from './queries/get.js'
import has from './queries/has.js'
import getAll from './queries/getAll.js'
import getAllAsArray from './queries/getAllAsArray.js'
import findByKey from './queries/findByKey.js'
import findByValue from './queries/findByValue.js'
import debug from './queries/debug.js'

/**
 * MetaStore: Metadata management system for objects and functions.
 *
 * Features:
 * - Store metadata on any object/function using nested keys (dot notation supported).
 * - Supports per-key TTL (time-to-live).
 * - Supports freeze, overwrite, and merge policies.
 * - Query metadata via: get, has, getAll, getAllAsArray, findByKey, findByValue.
 * - Provides debug snapshots of the entire store.
 */
export default class MetaStore {
  #store
  #targets = new Map()
  #targetCounterRef = { count: 0 }

  /**
   * Create a MetaStore instance with a cache backend.
   * @param {Object} store Cache instance (must implement get, set, delete, has, clear)
   * @throws {Error} If no cache instance is provided
   */
  constructor(store) {
    if (!store) throw new Error('A cache instance must be provided')
    this.#store = store
  }

  /**
   * Define metadata for a given target.
   * @param {Object|Function} target The target object or function
   * @param {string} key Metadata key (nested keys allowed with dot notation)
   * @param {*} value Metadata value
   * @param {Object} [options] Additional options:
   *   - overwrite {boolean} Overwrite existing key (default: false)
   *   - freeze {boolean} Prevent further modification (default: false)
   *   - merge {boolean} Merge object values (default: false)
   *   - ttl {number} Time-to-live in ms (optional)
   * @returns {*} The stored value
   */
  define(target, key, value, options = {}) {
    return defineCommand(this.#store, this.#targets, this.#targetCounterRef, target, key, value, options)
  }

  /**
   * Delete metadata for a target or a specific key.
   * @param {Object|Function} target The target object or function
   * @param {string} [key] Specific key to delete (optional)
   * @returns {boolean} Whether the operation was successful
   */
  delete(target, key) {
    return deleteCommand(this.#store, this.#targets, this.#targetCounterRef, target, key)
  }

  /**
   * Clear metadata from a specific target, or clear the entire store if no target is provided.
   * @param {Object|Function} [target] Target to clear (optional)
   * @returns {boolean} Whether the operation was successful
   */
  clear(target) {
    return clearStore(this.#store, this.#targets, this.#targetCounterRef, target)
  }

  /**
   * Retrieve metadata for a target or a specific key.
   * @param {Object|Function} target The target object or function
   * @param {string} [key] Nested key (optional)
   * @returns {*} The stored value or undefined if not found
   */
  get(target, key) {
    return get(this.#store, this.#targets, this.#targetCounterRef, target, key)
  }

  /**
   * Check if metadata exists for a given target/key.
   * @param {Object|Function} target The target object or function
   * @param {string} key Nested key
   * @returns {boolean} True if the metadata exists
   */
  has(target, key) {
    return has(this.#store, this.#targets, this.#targetCounterRef, target, key)
  }

  /**
   * Get all metadata as an object mapping target names to metadata.
   * @returns {Object<string, any>} Object with { targetName: metadata }
   */
  getAll() {
    return getAll(this.#store, this.#targets)
  }

  /**
   * Get all metadata as a flat array of entries.
   * @returns {Array<{ target: string, key: string, value: any }>}
   */
  getAllAsArray() {
    return getAllAsArray(this.#store, this.#targets)
  }

  /**
   * Search metadata by key.
   * @param {string} searchKey The key to search for
   * @param {Object} [options] Search options:
   *   - exact {boolean} Match exact key only (default: false)
   *   - ignoreCase {boolean} Case-insensitive match (default: false)
   *   - firstOnly {boolean} Return only the first match (default: false)
   * @returns {Array|Object|null} Search results, or null if not found
   */
  findByKey(searchKey, options) {
    return findByKey(this.#store, this.#targets, this.#targetCounterRef, searchKey, options)
  }

  /**
   * Search metadata by value using a predicate function.
   * @param {(value: any) => boolean} predicate Function that checks if a value matches
   * @returns {Array<{ target: string, key: string, value: any }>}
   */
  findByValue(predicate) {
    return findByValue(this.#store, this.#targets, this.#targetCounterRef, predicate)
  }

  /**
   * Get a debug snapshot of the store and targets.
   * @returns {{ targets: string[], data: Object<string, any> }}
   */
  debug() {
    return debug(this.#store, this.#targets)
  }
}
