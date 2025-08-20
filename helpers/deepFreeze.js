/**
 * Deep freeze object (immutable), aman untuk circular reference
 * @param {object} obj
 * @param {WeakSet<object>} [seen]
 * @returns {object} frozen object
 */
export default function deepFreeze(obj, seen = new WeakSet()) {
  if (typeof obj !== 'object' || obj === null || seen.has(obj)) return obj;
  seen.add(obj);
  Object.freeze(obj);

  const proto = Object.getPrototypeOf(obj);
  if (proto && typeof proto === 'object' && !seen.has(proto)) {
    deepFreeze(proto, seen);
    Object.setPrototypeOf(obj, proto);
  }

  for (const key of Reflect.ownKeys(obj)) {
    const value = obj[key];
    if (value && typeof value === 'object') deepFreeze(value, seen);
  }

  return obj;
      }
