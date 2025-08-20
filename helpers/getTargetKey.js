/**
 * Generate or retrieve unique key for target object/function
 * @param {any} target * @param {Map|WeakMap} targetsMap
 * @param {{ count: number }} counterRef
 * @returns {string} unique key
 */
export default function getTargetKey(target, targetsMap, counterRef) {
  if (typeof target === 'string') return target;
  if (typeof target !== 'object' || target === null) return String(target);

  let key = targetsMap.get(target);
  if (!key) {
    const name = target.constructor?.name || 'Object';
    key = `__target_${++counterRef.count}__${name}`;
    targetsMap.set(target, key);
  }
  return key;
}
