// CacheStore.js
import Cache from '@velosjs/cache';

/**
 * CacheStore acts as a wrapper around the underlying Cache implementation,
 * specifically designed to be used as the storage backend for MetaStore.
 *
 * Responsibilities:
 * - Provide a consistent interface for MetaStore.
 * - Support common cache operations: set, get, delete, has, clear.
 * - Optionally support TTL (time-to-live) per entry.
 */
export default class CacheStore {
  /**
   * Create a CacheStore instance.
   * @param {Object} options - Configuration options passed directly to the underlying Cache.
   */
  constructor(options) {
    this.cache = new Cache(options);
  }

  /**
   * Set a value in the cache.
   * @param {string} key - The cache key.
   * @param {*} value - The value to store.
   * @param {number} [ttl] - Optional time-to-live (in milliseconds).
   * @returns {boolean} Whether the operation was successful.
   */
  set(key, value, ttl) { return this.cache.set(key, value, ttl); }

  /**
   * Get a value from the cache by key.
   * @param {string} key - The cache key.
   * @returns {*} The stored value, or undefined if not found.
   */
  get(key) { return this.cache.get(key); }

  /**
   * Delete a value from the cache by key.
   * @param {string} key - The cache key.
   * @returns {boolean} Whether the key was found and deleted.
   */
  delete(key) { return this.cache.delete(key); }

  /**
   * Check if a key exists in the cache.
   * @param {string} key - The cache key.
   * @returns {boolean} True if the key exists, false otherwise.
   */
  has(key) { return this.cache.has(key); }

  /**
   * Clear all entries from the cache.
   * @returns {void}
   */
  clear() { return this.cache.clear(); }
}
