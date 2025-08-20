import getTargetName from '../helpers/getTargetName.js'

/**
 * Retrieves all metadata stored in the metadata store.
 *
 * Features:
 * - Returns all metadata grouped by target as an object.
 * - The keys of the result are target names produced by `getTargetName`.
 * - Only targets that actually have metadata in the store will be included.
 *
 * @param {Map<string, any>} store
 *   The main metadata store that maps unique keys to metadata objects.
 * @param {Map<any, string> | WeakMap<object, string>} targets
 *   Map or WeakMap mapping targets to their unique keys.
 * @returns {Object<string, any>}
 *   An object in the format `{ targetName: metadata, ... }`.
 *
 * @example
 * const allMeta = getAll(store, targets)
 * console.log(allMeta.myFunction) // metadata of the target "myFunction"
 */
export default function getAll(store, targets) {
  const result = {}
  for (const [target, key] of targets.entries()) {
    const metadata = store.get(key)
    if (metadata) result[getTargetName(target)] = metadata
  }
  return result
}
