import getAll from './getAll.js'
import getTargetName from '../helpers/getTargetName.js'

/**
 * Returns a debug snapshot of the metadata store and its targets.
 *
 * Features:
 * - Provides a list of all registered targets.
 * - Provides all metadata stored for each target.
 *
 * @param {Map<string, any>} store
 *   The main metadata store holding key-value pairs.
 * @param {Map<any, string> | WeakMap<object, string>} targets
 *   A Map/WeakMap that maps each target to a unique key.
 *
 * @returns {{ targets: string[], data: Object<string, any> }}
 *   An object containing:
 *   - targets: Array of target names.
 *   - data: Object with metadata for each target.
 *
 * @example
 * const snapshot = debug(store, targets)
 * console.log(snapshot.targets) // ["myFunc", "myObj"]
 * console.log(snapshot.data)    // { myFunc: {...}, myObj: {...} }
 */

export default function debug(store, targets) {
  return {
    targets: Array.from(targets.keys()).map(t => getTargetName(t)),
    data: getAll(store, targets)
  }
}
