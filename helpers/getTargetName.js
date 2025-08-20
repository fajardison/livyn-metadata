/**
 * Get a descriptive name for the target
 * @param {any} target
 * @returns {string}
 */
export default function getTargetName(target) {
  if (target === null) return 'null';
  const t = typeof target;
  if (t !== 'object' && t !== 'function') return t;
  return target.constructor?.name || 'Object';
}
